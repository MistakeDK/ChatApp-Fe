import { IConversationPreview } from "@/services/chat/chat.interface";
import { Avatar, Card, CardBody, Skeleton } from "@heroui/react";
interface IProps {
  chatPreview: IConversationPreview;
  isLoading: boolean;
}
export const ChatCard = ({ chatPreview, isLoading }: IProps) => {
  return (
    <div className="w-full">
      <Card>
        <CardBody>
          <Skeleton isLoaded={!isLoading}>
            <div className="w-full flex space-x-2">
              <div>
                <Avatar></Avatar>
              </div>
              <div className="w-full flex flex-col">
                <span>{chatPreview.name}</span>
                <span>{chatPreview.lastMessage.message}</span>
              </div>
            </div>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
};
