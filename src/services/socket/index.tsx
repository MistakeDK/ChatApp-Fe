import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import socket from "./socket";
import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "../interface";
import { IMessageDetail } from "../chat/chat.interface";
import { eTypeMessage } from "@/config/enum";

interface IMessageReceive {
  conversationId: string;
  sender: string;
  content: string;
  receiver: string;
}

export const WebSocketApp = () => {
  const { idUser, accessToken } = useAuthStore();
  const querryClient = useQueryClient();
  const updateConversation = (message: IMessageReceive) => {
    const { content, conversationId, sender } = message;
    const newMessage = {
      sender: sender,
      content: content,
      type: eTypeMessage.TEXT,
      conversationId: conversationId,
    };
    querryClient.setQueryData(
      [message.conversationId],
      (oldData: IResponse<IMessageDetail[]>) => {
        return {
          ...oldData,
          message: [newMessage, ...(oldData?.message || [])],
        };
      }
    );
  };
  useEffect(() => {
    socket.auth = { token: accessToken };
    socket.connect();

    socket.emit("storeIdUser", { id: idUser });

    socket.on("receiveMessage", (message: IMessageReceive) => {
      updateConversation(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [idUser, accessToken]);

  return null;
};
