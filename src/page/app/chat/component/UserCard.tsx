import { getOrCreateConversationApi } from "@/services/chat/chat";
import { IUserSearch } from "@/services/user/user.interface";
import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chat.store";
import { Avatar, Card, CardBody } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface IProps {
  userInfo: IUserSearch;
}

export const UserCard = ({ userInfo }: IProps) => {
  const { idUser } = useAuthStore();
  const { selectTarget } = useChatStore();
  const getOrCreateConversation = useMutation({
    mutationKey: ["getOrCreateConversation", `${idUser}-${userInfo.id}`],
    mutationFn: () => {
      return getOrCreateConversationApi({
        body: {
          participants: [idUser as string, userInfo.id],
        },
      });
    },
    onSuccess: (response) => {
      selectTarget(response.message._id, userInfo.name, response.message.isNew);
    },
  });
  return (
    <React.Fragment>
      <div
        className="w-full"
        onClick={() => {
          getOrCreateConversation.mutate();
        }}
      >
        <Card className="flex w-full">
          <CardBody>
            <div className="flex w-full items-center space-x-3">
              <Avatar />
              <span>{userInfo.name}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};
