import { IMessageDetail } from "@/services/chat/chat.interface";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, Card, CardBody } from "@heroui/react";
import React from "react";

type stateMessage = "pending" | "error" | "success";
interface IProps {
  messageDetail: IMessageDetail;
  state: stateMessage;
}

export const Message = ({ messageDetail, state }: IProps) => {
  const { idUser } = useAuthStore();
  return (
    <React.Fragment>
      <div
        className={`flex w-full py-2 space-x-2 ${
          state === "pending" && "opacity-60"
        } ${messageDetail.sender === idUser ? "justify-end" : "justify-start"}`}
      >
        {messageDetail.sender !== idUser && <Avatar />}
        <Card
          classNames={{
            body: "max-w-[18rem]",
          }}
        >
          <CardBody>{messageDetail.content}</CardBody>
        </Card>
        {messageDetail.sender === idUser && <Avatar />}
      </div>
    </React.Fragment>
  );
};
