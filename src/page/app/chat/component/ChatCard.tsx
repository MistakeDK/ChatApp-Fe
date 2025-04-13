import { IConversationPreview } from "@/services/chat/chat.interface";
import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chat.store";
import { Avatar, Card, CardBody, Skeleton } from "@heroui/react";
import { useMemo } from "react";
interface IProps {
  chatPreview: IConversationPreview;
  isLoading: boolean;
}

export const ChatCard = ({ chatPreview, isLoading }: IProps) => {
  const { idUser } = useAuthStore();
  const { selectTarget, chatTarget } = useChatStore();
  const isSelect = chatTarget === chatPreview._id;
  const isNeedHide = chatPreview.lastMessage.message.length >= 24;
  const nameUser = useMemo(() => {
    const indexUser = chatPreview.nameParticipants.indexOf(idUser as string);
    if (indexUser === 1) {
      return chatPreview.nameParticipants[0];
    } else {
      return chatPreview.nameParticipants[1];
    }
  }, []);
  return (
    <div
      className="w-full"
      onClick={() => {
        selectTarget(chatPreview._id, chatPreview.lastMessage.username);
      }}
    >
      <Card
        classNames={{
          body: `${isSelect && "bg-primary-600 text-white"}`,
        }}
      >
        <CardBody>
          <Skeleton isLoaded={!isLoading}>
            <div className="w-full flex space-x-2">
              <div>
                <Avatar></Avatar>
              </div>
              <div className="w-full flex flex-col">
                <span>{nameUser}</span>
                <div className="w-full flex space-x-2">
                  <span>{chatPreview.lastMessage.username}:</span>
                  <span>
                    {isNeedHide
                      ? chatPreview.lastMessage.message.slice(0, 24)
                      : chatPreview.lastMessage.message}
                  </span>
                </div>
              </div>
            </div>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
};
