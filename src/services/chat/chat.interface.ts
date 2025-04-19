import { eTypeMessage } from "@/config/enum";

export interface IConversationPreview {
  _id: string;
  lastMessage: {
    idUser: string;
    message: string;
  };
  nameParticipants: [string, string];
  participants: [string, string];
}

export interface IResponseGetListConversation {
  total: number;
  listConversation: IConversationPreview[];
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

export interface IBodyCreateConversation {
  participants: [string, string];
}
