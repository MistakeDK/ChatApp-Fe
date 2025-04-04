export interface IConversationPreview {
  _id: string;
  lastMessage: {
    idUser: string;
    message: string;
    username: string;
  };
}

export interface IMessageDetail {
  _id: string;
  sender: string;
  content: string;
}
