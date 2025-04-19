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
  idUser: string,
  message: IResponseSendMessage | IMessageReceive
) => {
  queryClient.setQueryData(
    ["listConversation", idUser],
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

export default {
  updateListConversationCache,
};
