import React from "react";
import { ChatBoxHeader } from "./components/ChatBoxHeader";
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "@/store/chat.store";
import { getMessageDetail } from "@/services/chat/chat";
import { Message } from "./components/Message";
import { Input } from "@heroui/react";

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
          <div className="w-full py-1 items-end">
            <Input />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
