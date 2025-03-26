import { getListPreviewConversationApi } from "@/services/chat/chat";
import { useAuthStore } from "@/store/auth.store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ChatCard } from "./components/ChatCard";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useChatStore } from "@/store/chat.store";
export const SideChat = () => {
  const { idUser } = useAuthStore();
  const [page] = useState<number>(1);
  const { selectTarget } = useChatStore();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [`${idUser}:${page}`],
    enabled: !!idUser,
    queryFn: () =>
      getListPreviewConversationApi({
        pathVariable: {
          id: idUser as string,
        },
        queryParam: {
          limit: 10,
          page,
        },
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    if (page === 1) {
      const { _id, name } = data.message[0];
      selectTarget(_id, name);
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full overflow-y-auto bg-slate-700 rounded-lg p-2 space-y-2">
        <div className="w-full flex">
          <Input
            className="text-2xl"
            startContent={
              <React.Fragment>
                <Icon icon="mdi:search" />
              </React.Fragment>
            }
          />
        </div>
        {data?.message.map((item) => (
          <ChatCard isLoading={isFetching} chatPreview={item}></ChatCard>
        ))}
      </div>
    </React.Fragment>
  );
};
