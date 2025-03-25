import { getListPreviewConversationApi } from "@/services/chat/chat";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ChatCard } from "./components/ChatCard";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
export const SideChat = () => {
  const { idUser } = useAuthStore();
  const { data, isFetching } = useQuery({
    queryKey: [idUser],
    enabled: !!idUser,
    queryFn: () =>
      getListPreviewConversationApi({
        pathVariable: {
          id: idUser as string,
        },
      }),
  });
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
