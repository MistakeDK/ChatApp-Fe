import { IConversationPreview } from "@/services/chat/chat.interface";
import helper from "@/services/socket/helper";
import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chat.store";
import { Avatar, Badge, Card, CardBody, Skeleton } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
interface IProps {
  chatPreview: IConversationPreview;
  isLoading: boolean;
}

export const ChatCard = ({ chatPreview, isLoading }: IProps) => {
  const queryClient = useQueryClient();
  const { idUser } = useAuthStore();
  const { selectTarget, chatTarget } = useChatStore();
  const isSelect = chatTarget === chatPreview._id;
  const isNeedHide = chatPreview?.lastMessage?.message.length >= 24;
  const nameUser = useMemo(() => {
    const indexUser = chatPreview.participants.indexOf(idUser as string);
    if (indexUser === 1) {
      return chatPreview.nameParticipants[0];
    } else {
      return chatPreview.nameParticipants[1];
    }
  }, [idUser, chatPreview]);

  return (
    <div
      className="w-full "
      onClick={() => {
        selectTarget(chatPreview._id, nameUser, false);
        helper.removeNewStateInConversation(queryClient, chatPreview._id);
      }}
    >
      <Badge
        classNames={{
          base: "flex",
          badge: "top-[3%] right-[2%]",
        }}
        color="primary"
        content=""
        size="sm"
        isInvisible={!chatPreview.isNew}
      >
        <Card
          fullWidth
          className="w-full"
          classNames={{
            base: "w-full",
            body: `${isSelect && "bg-primary-600 text-white"} flex`,
          }}
        >
          <CardBody>
            <Skeleton isLoaded={!isLoading}>
              <div className="w-full flex space-x-2">
                <div>
                  <Avatar />
                </div>
                <div className="w-full flex flex-col">
                  <span>{nameUser}</span>
                  <div className="w-full flex space-x-2">
                    <span>
                      {chatPreview.lastMessage.idUser === idUser
                        ? "You"
                        : nameUser}
                      :
                    </span>
                    <span>
                      {isNeedHide
                        ? chatPreview?.lastMessage?.message.slice(0, 24)
                        : chatPreview?.lastMessage?.message}
                    </span>
                  </div>
                </div>
              </div>
            </Skeleton>
          </CardBody>
        </Card>
      </Badge>
    </div>
  );
};
