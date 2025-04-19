export interface IMessageReceive {
  conversationId: string;
  sender: string;
  content: string;
  receiver: string;
  participants: [string, string];
  nameParticipants: [string, string];
}
