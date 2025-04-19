import { create } from "zustand";

type chatState = {
  chatTarget: string | null;
  chatName: string | null;
  isNew: boolean;
};
type chatAction = {
  selectTarget: (idChat: string, chatName: string, isNew: boolean) => void;
};

export const useChatStore = create<chatAction & chatState>()((set) => {
  return {
    chatTarget: null,
    chatName: null,
    isNew: false,
    selectTarget: (idChat: string, chatName: string, isNew: boolean) =>
      set({
        chatTarget: idChat,
        chatName: chatName,
        isNew: isNew,
      }),
  };
});
