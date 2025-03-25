export interface IConversationPreview {
  _id: string;
  lastMessage: {
    idUser: string;
    message: string;
  };
  name: string;
}

export interface IMessageDetail {
  _id: string;
  sender: string;
  content: string;
}
