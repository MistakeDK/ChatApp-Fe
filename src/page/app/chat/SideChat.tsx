import { getListPreviewConversationApi } from "@/services/chat/chat";
import { useAuthStore } from "@/store/auth.store";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { ChatCard } from "./component/ChatCard";
import { Input, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useChatStore } from "@/store/chat.store";
import { findUserByName } from "@/services/user/user";
import _ from "lodash";
import { IUserSearchResponse } from "@/services/user/user.interface";
import { IResponse } from "@/services/interface";
import { UserCard } from "./component/UserCard";
import { PAGE_SIZE } from "@/config/constant";

export const SideChat = () => {
  const { idUser } = useAuthStore();
  const [pageConversation] = useState<number>(1);
  const [inputSearchUser, setInputSearchUser] = useState<string>();
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
        limit: 10,
        name: inputSearchUser as string,
      },
    });
    return result;
  };

  const getUserById = useInfiniteQuery<IResponse<IUserSearchResponse>>({
    queryKey: ["getUserById", inputSearchUser],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.length * PAGE_SIZE;
      const totalRecords = lastPage?.message.total;
      return totalLoaded < totalRecords ? allPages.length + 1 : undefined;
    },
    queryFn: ({ pageParam }) => fetchUser(pageParam as number),
    enabled: !_.isEmpty(inputSearchUser),
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
      <div className="flex flex-col w-full h-full overflow-y-auto bg-slate-700 rounded-lg p-2 space-y-2">
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
            {getUserById.isSuccess &&
              getUserById.data.pages.map((page) => {
                return page.message.users.map((user) => (
                  <UserCard userInfo={user} />
                ));
              })}
            {(getUserById.isLoading || getUserById.isFetchingNextPage) && (
              <Spinner />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
