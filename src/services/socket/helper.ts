import { QueryClient } from "@tanstack/react-query";
import {
  IResponseGetListConversation,
  IConversationPreview,
  IResponseSendMessage,
} from "../chat/chat.interface";
import { IResponse } from "../interface";
import { IMessageReceive } from "./socket.interface";

const updateListConversationCache = (
  queryClient: QueryClient,
  message: IResponseSendMessage | IMessageReceive,
  isNew: boolean
) => {
  queryClient.setQueryData(
    ["listConversation"],
    (oldData: { pages: IResponse<IResponseGetListConversation>[] }) => {
      const { pages } = oldData;
      let targetConversation: IConversationPreview = {
        _id: message.conversationId,
        participants: message.participants,
        nameParticipants: message.nameParticipants,
        lastMessage: {
          idUser: message.sender,
          message: message.content,
        },
        isNew: isNew,
      };

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
              isNew: isNew,
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

const removeNewStateInConversation = (
  queryClient: QueryClient,
  idConversation: string
) => {
  queryClient.setQueryData(
    ["listConversation"],
    (oldData: { pages: IResponse<IResponseGetListConversation>[] }) => {
      if (!oldData) return oldData;

      const updatedPages = oldData.pages.map((page) => {
        return {
          ...page,
          message: {
            ...page.message,
            listConversation: page.message.listConversation.map(
              (conversation) =>
                conversation._id === idConversation
                  ? { ...conversation, isNew: false }
                  : conversation
            ),
          },
        };
      });

      return {
        ...oldData,
        pages: updatedPages,
      };
    }
  );
};

export default {
  updateListConversationCache,
  removeNewStateInConversation,
};
