import React from "react";
import { ChatBoxHeader } from "./component/ChatBoxHeader";
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "@/store/chat.store";
import { getMessageDetail } from "@/services/chat/chat";
import { Message } from "./component/Message";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export const ChatBox = () => {
  const { chatTarget } = useChatStore();
  const { data } = useQuery({
    queryKey: [chatTarget],
    enabled: !!chatTarget,
    retry: false,
    queryFn: () =>
      getMessageDetail({
        pathVariable: {
          id: chatTarget as string,
        },
      }),
  });
  return (
    <React.Fragment>
      <div className=" w-full h-full px-2 overflow-hidden">
        <div className="flex flex-col w-full h-full bg-slate-700 rounded-lg">
          <div className="w-full">
            {/* Header chat box */}
            <ChatBoxHeader />
          </div>
          <div className="flex w-full h-full flex-col-reverse p-2  overflow-y-auto items-end">
            {data?.message.map((message) => (
              <Message messageDetail={message}></Message>
            ))}
          </div>
          <Input
            radius="none"
            endContent={
              <Button size="sm" isIconOnly>
                <Icon
                  icon="material-symbols:send-rounded"
                  width="24"
                  height="24"
                />
              </Button>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};
