import { getListPreviewConversationApi } from "@/services/chat/chat";
import { useAuthStore } from "@/store/auth.store";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChatCard } from "./component/ChatCard";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useChatStore } from "@/store/chat.store";
import { findUserByName } from "@/services/user/user";
import _ from "lodash";
import { IUserSearchResponse } from "@/services/user/user.interface";
import { IResponse } from "@/services/interface";
import { UserCard } from "./component/UserCard";
import { PAGE_SIZE } from "@/config/constant";
import { useScrollEvent } from "@/hook/useScrollEvent";
import { SkeletonUserCard } from "./component/SkeletonUserCard";

export const SideChat = () => {
  const { idUser } = useAuthStore();
  const [pageConversation] = useState<number>(1);
  const [inputSearchUser, setInputSearchUser] = useState<string>();
  const divRef = useRef<HTMLDivElement>(null);

  const { selectTarget } = useChatStore();

  const debouncedSetSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        setInputSearchUser(value);
      }, 300),
    []
  );

  const getConversationQuerry = useQuery({
    queryKey: [`${idUser}:${pageConversation}`],
    enabled: !!idUser,
    queryFn: () =>
      getListPreviewConversationApi({
        pathVariable: {
          id: idUser as string,
        },
        queryParam: {
          limit: 10,
          page: pageConversation,
        },
      }),
    placeholderData: keepPreviousData,
  });

  const fetchUser = async (pageParam: number) => {
    const result = await findUserByName({
      queryParam: {
        page: pageParam,
        limit: 15,
        name: inputSearchUser as string,
      },
    });
    return result;
  };

  const getUserByName = useInfiniteQuery<IResponse<IUserSearchResponse>>({
    queryKey: ["getUserByName", inputSearchUser],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.length * PAGE_SIZE;
      const totalRecords = lastPage?.message.total;
      return totalLoaded < totalRecords ? allPages.length + 1 : undefined;
    },
    queryFn: ({ pageParam }) => fetchUser(pageParam as number),
    enabled: !_.isEmpty(inputSearchUser),
  });

  useScrollEvent({
    divElement: divRef,
    delay: 500,
    event: () => getUserByName.fetchNextPage(),
  });

  useEffect(() => {
    if (!getConversationQuerry.data) {
      return;
    }
    if (pageConversation === 1) {
      const { _id, lastMessage } = getConversationQuerry.data.message[0];
      selectTarget(_id, lastMessage.username);
    }
  }, [getConversationQuerry.isSuccess]);

  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full bg-slate-700 rounded-lg px-2 py-1 space-y-2">
        <div className="w-full flex">
          <Input
            placeholder="Search user"
            className="text-2xl"
            onChange={(e) => debouncedSetSearch(e.target.value)}
            startContent={
              <React.Fragment>
                <Icon icon="mdi:search" />
              </React.Fragment>
            }
          />
        </div>
        <div className="w-full h-[93%] overflow-y-auto space-y-2" ref={divRef}>
          {_.isEmpty(inputSearchUser) &&
            getConversationQuerry.data?.message.map((item) => (
              <ChatCard
                key={item._id}
                isLoading={getConversationQuerry.isFetching}
                chatPreview={item}
              ></ChatCard>
            ))}
          {!_.isEmpty(inputSearchUser) && (
            <div className="flex flex-col w-full h-full space-y-1">
              {getUserByName.isSuccess &&
                getUserByName.data.pages.map((page) => {
                  return page.message.users.map((user) => {
                    if (user.id === idUser) return null;
                    return <UserCard userInfo={user} key={user.id} />;
                  });
                })}
              {(getUserByName.isLoading ||
                getUserByName.isFetchingNextPage) && (
                <SkeletonUserCard numberLoop={4} />
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
