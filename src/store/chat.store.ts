import { create } from "zustand";

type chatState = {
  chatTarget: string | null;
  chatName: string | null;
};
type chatAction = {
  selectTarget: (idChat: string, chatName: string, isNew: boolean) => void;
  clear: () => void;
};

export const useChatStore = create<chatAction & chatState>()((set) => {
  return {
    chatTarget: null,
    chatName: null,
    selectTarget: (idChat: string, chatName: string) =>
      set({
        chatTarget: idChat,
        chatName: chatName,
      }),
    clear: () =>
      set({
        chatName: null,
        chatTarget: null,
      }),
  };
});
