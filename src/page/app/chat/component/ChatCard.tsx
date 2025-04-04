import { IConversationPreview } from "@/services/chat/chat.interface";
import { useChatStore } from "@/store/chat.store";
import { Avatar, Card, CardBody, Skeleton } from "@heroui/react";
interface IProps {
  chatPreview: IConversationPreview;
  isLoading: boolean;
}
export const ChatCard = ({ chatPreview, isLoading }: IProps) => {
  const { selectTarget, chatTarget } = useChatStore();
  const isSelect = chatTarget === chatPreview._id;
  return (
    <div
      className="w-full"
      onClick={() => {
        selectTarget(chatPreview._id, chatPreview.lastMessage.username);
      }}
    >
      <Card
        classNames={{
          body: `${isSelect && "bg-blue-600 text-white"}`,
        }}
      >
        <CardBody>
          <Skeleton isLoaded={!isLoading}>
            <div className="w-full flex space-x-2">
              <div>
                <Avatar></Avatar>
              </div>
              <div className="w-full flex flex-col">
                <span>{chatPreview.lastMessage.username}</span>
                <span>{chatPreview.lastMessage.message}</span>
              </div>
            </div>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
};
