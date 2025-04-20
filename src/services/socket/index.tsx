import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import socket from "./socket";
import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "../interface";
import { IResponseMessageDetail } from "../chat/chat.interface";
import { eTypeMessage } from "@/config/enum";
import { IMessageReceive } from "./socket.interface";
import helper from "./helper";
import _ from "lodash";
import { useChatStore } from "@/store/chat.store";

export const WebSocketApp = () => {
  const { idUser, accessToken } = useAuthStore();
  const { chatTarget } = useChatStore();
  const querryClient = useQueryClient();

  const updateDetailConversation = (message: IMessageReceive) => {
    const { content, sender, _id, conversationId } = message;
    const newMessage = {
      sender: sender,
      content: content,
      type: eTypeMessage.TEXT,
      conversationId,
      _id,
    };
    querryClient.setQueryData(
      [conversationId],
      (oldData: { pages: IResponse<IResponseMessageDetail>[] }) => {
        const cloneOldData = _.cloneDeep(oldData);
        cloneOldData.pages[0].message.messageConversation.unshift(newMessage);
        return cloneOldData;
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
        message,
        chatTarget !== message.conversationId
      );
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [idUser, accessToken]);

  return null;
};
