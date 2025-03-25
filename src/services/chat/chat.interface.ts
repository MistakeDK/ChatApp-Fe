export interface IConversationPreview {
  _id: string;
  lastMessage: {
    idUser: string;
    message: string;
  };
  name:string
}
