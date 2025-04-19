import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import socket from "./socket";
import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "../interface";
import { IMessageDetail } from "../chat/chat.interface";
import { eTypeMessage } from "@/config/enum";
import { IMessageReceive } from "./socket.interface";
import helper from "./helper";

export const WebSocketApp = () => {
  const { idUser, accessToken } = useAuthStore();
  const querryClient = useQueryClient();

  const updateDetailConversation = (message: IMessageReceive) => {
    const { content, conversationId, sender } = message;
    console.log();
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
      updateDetailConversation(message);
      helper.updateListConversationCache(
        querryClient,
        idUser as string,
        message
      );
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [idUser, accessToken]);

  return null;
};
