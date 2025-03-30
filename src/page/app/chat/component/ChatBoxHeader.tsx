import { useChatStore } from "@/store/chat.store";
import { Avatar, Card, CardBody } from "@heroui/react";
import React from "react";

export const ChatBoxHeader = () => {
  const { chatName } = useChatStore();
  return (
    <React.Fragment>
      <Card
        radius="none"
        classNames={{
          base: "rounded-t-lg",
        }}
      >
        <CardBody>
          <div className="flex w-full items-center space-x-2">
            <Avatar />
            <span>{chatName}</span>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
