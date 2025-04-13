import { eTypeMessage } from "@/config/enum";

export interface IConversationPreview {
  _id: string;
  lastMessage: {
    idUser: string;
    message: string;
    username: string;
  };
  nameParticipants: [string, string];
}

export interface IMessageDetail {
  _id?: string;
  sender: string;
  content: string;
  optimistic?: boolean;
}

export interface IBodySendMessage {
  conversationId: string;
  sender: string;
  content: string;
  type: eTypeMessage;
  receiver?: string;
}
