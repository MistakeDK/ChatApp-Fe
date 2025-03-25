import { IMessageDetail } from "@/services/chat/chat.interface";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, Card, CardBody } from "@heroui/react";
import React from "react";

interface IProps {
  messageDetail: IMessageDetail;
}

export const Message = ({ messageDetail }: IProps) => {
  const { idUser } = useAuthStore();
  return (
    <React.Fragment>
      <div
        className={`flex w-full space-x-2 m-2 ${
          messageDetail.sender === idUser ? "justify-start" : "justify-end"
        }`}
      >
        {messageDetail.sender === idUser && <Avatar />}
        <Card
          classNames={{
            body: "max-w-[18rem]",
          }}
        >
          <CardBody>{messageDetail.content}</CardBody>
        </Card>
        {messageDetail.sender !== idUser && <Avatar />}
      </div>
    </React.Fragment>
  );
};
