export interface IMessageReceive {
  conversationId: string;
  sender: string;
  content: string;
  receiver: string;
  _id: string;
  participants: [string, string];
  nameParticipants: [string, string];
}
