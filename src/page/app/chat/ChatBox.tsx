import React, { ChangeEvent, useState } from "react";
import { ChatBoxHeader } from "./component/ChatBoxHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useChatStore } from "@/store/chat.store";

import { Message } from "./component/Message";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "@/store/auth.store";
import { eTypeMessage } from "@/config/enum";
import { IResponse } from "@/services/interface";
import { IMessageDetail } from "@/services/chat/chat.interface";
import _ from "lodash";
import { getMessageDetailApi, sendMessageApi } from "@/services/chat/chat";
import helper from "@/services/socket/helper";

export const ChatBox = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { chatTarget } = useChatStore();
  const { idUser } = useAuthStore();
  const { data } = useQuery({
    queryKey: [chatTarget],
    enabled: !!chatTarget,
    retry: false,
    queryFn: () =>
      getMessageDetailApi({
        pathVariable: {
          id: chatTarget as string,
        },
      }),
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      sendMessageApi({
        body: {
          sender: idUser as string,
          content: text,
          type: eTypeMessage.TEXT,
          conversationId: chatTarget as string,
        },
      }),
    retry: false,
    onSuccess: (response) => {
      queryClient.setQueryData(
        [chatTarget],
        (oldData: IResponse<IMessageDetail[]>) => {
          const filtered = oldData.message.filter(
            (m: IMessageDetail) => !m.optimistic
          );
          return {
            ...oldData,
            message: [
              {
                ...response.message,
                sender: idUser,
              },
              ...filtered,
            ],
          };
        }
      );
      //   ["listConversation", idUser],
      //   (oldData: { pages: IResponse<IResponseGetListConversation>[] }) => {
      //     const { message } = response;
      //     const { pages } = oldData;
      //     let targetConversation: IConversationPreview = {
      //       _id: message.conversationId,
      //       participants: message.participants,
      //       nameParticipants: message.nameParticipants,
      //       lastMessage: {
      //         idUser: message.sender,
      //         message: message.content,
      //       },
      //     };
      //     const updatedPages = pages.map((page) => {
      //       const newList = page.message.listConversation.filter((conv) => {
      //         const isMatch = conv._id === message.conversationId;
      //         if (isMatch) {
      //           targetConversation = {
      //             ...conv,
      //             lastMessage: {
      //               idUser: message.sender,
      //               message: message.content,
      //             },
      //           };
      //         }
      //         return !isMatch;
      //       });

      //       return {
      //         ...page,
      //         message: {
      //           ...page.message,
      //           listConversation: newList,
      //         },
      //       };
      //     });

      //     updatedPages[0].message.listConversation = [
      //       targetConversation,
      //       ...updatedPages[0].message.listConversation,
      //     ];
      //     return {
      //       ...oldData,
      //       pages: updatedPages,
      //     };
      //   }
      // );
      helper.updateListConversationCache(
        queryClient,
        idUser as string,
        response.message
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [chatTarget] });
      const previousData = queryClient.getQueryData([chatTarget]);
      const optimisticMessage = {
        sender: idUser,
        content: text,
        type: eTypeMessage.TEXT,
        conversationId: chatTarget,
        optimistic: true,
      };

      queryClient.setQueryData(
        [chatTarget],
        (oldData: IResponse<IMessageDetail[]>) => {
          return {
            ...oldData,
            message: [...(oldData?.message || []), optimisticMessage],
          };
        }
      );
      return { previousData };
    },
    onError: (_err, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([chatTarget], context.previousData);
      }
    },
    onSettled: () => {
      setText("");
    },
  });

  const onSendMessage = () => {
    mutate();
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <React.Fragment>
      <div className=" w-full h-full px-2  overflow-hidden">
        <div className="flex flex-col w-full bg-gray-600 h-full rounded-lg">
          <div className="w-full">
            {/* Header chat box */}
            <ChatBoxHeader />
          </div>
          <div className="flex w-full h-full flex-col-reverse p-2 overflow-y-auto items-end">
            {data?.message.map((message) => (
              <Message
                messageDetail={message}
                state="success"
                key={message._id}
              ></Message>
            ))}
          </div>
          <Input
            className="mb-2 px-2"
            value={text}
            onChange={onChangeInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !_.isEmpty(text)) {
                onSendMessage();
              }
            }}
            endContent={
              <Button
                onPress={onSendMessage}
                size="sm"
                isIconOnly
                isDisabled={_.isEmpty(text)}
                disableAnimation
              >
                <Icon
                  icon="material-symbols:send-rounded"
                  width="24"
                  height="24"
                />
              </Button>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};
