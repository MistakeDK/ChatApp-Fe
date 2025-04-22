import { eTypeMessage } from "@/config/enum";

export interface IConversationPreview {
  _id: string;
  lastMessage: {
    idUser: string;
    message: string;
  };
  nameParticipants: [string, string];
  participants: [string, string];
  isNew?: boolean;
}

export interface IResponseGetListConversation {
  cursor: string;
  listConversation: IConversationPreview[];
}

export interface IMessageDetail {
  _id?: string;
  sender: string;
  content: string;
  type: eTypeMessage;
  optimistic?: boolean;
}

export interface IResponseMessageDetail {
  messageConversation: IMessageDetail[];
  nextCursor: string | null;
}

export interface IBodySendMessage {
  conversationId: string;
  sender: string;
  content: string;
  type: eTypeMessage;
  receiver?: string;
}

export type IResponseSendMessage = IBodySendMessage & {
  participants: [string, string];
  nameParticipants: [string, string];
};

export interface IBodyCreateConversation {
  participants: [string, string];
}
