import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import socket from "./socket";
import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "../interface";
import {
  IConversationPreview,
  IMessageDetail,
  IResponseGetListConversation,
} from "../chat/chat.interface";
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

  const updateDetailConversation = (message: IMessageReceive) => {
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

  const updateConversationSideBar = (message: IMessageReceive) => {
    querryClient.setQueryData(
      ["listConversation", idUser as string],
      (oldData: {
        pageParams: number[];
        pages: IResponse<IResponseGetListConversation>[];
      }) => {
        const { pages } = oldData;
        let targetConversation: IConversationPreview = null;
        const updatedPages = pages.map((page) => {
          const newList = page.message.listConversation.filter((conv) => {
            const isMatch = conv._id === message.conversationId;
            if (isMatch) {
              targetConversation = {
                ...conv,
                lastMessage: {
                  idUser: message.sender,
                  message: message.content,
                },
              };
            }
            return !isMatch;
          });

          return {
            ...page,
            message: {
              ...page.message,
              listConversation: newList,
            },
          };
        });
        if (!targetConversation) return oldData;

        updatedPages[0].message.listConversation = [
          targetConversation,
          ...updatedPages[0].message.listConversation,
        ];

        return {
          ...oldData,
          pages: updatedPages,
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
      updateConversationSideBar(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [idUser, accessToken]);

  return null;
};
