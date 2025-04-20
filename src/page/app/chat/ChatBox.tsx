import React, { ChangeEvent, useRef, useState } from "react";
import { ChatBoxHeader } from "./component/ChatBoxHeader";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useChatStore } from "@/store/chat.store";

import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "@/store/auth.store";
import { eTypeMessage } from "@/config/enum";
import { IResponse } from "@/services/interface";
import { IResponseMessageDetail } from "@/services/chat/chat.interface";
import _ from "lodash";
import { getMessageDetailApi, sendMessageApi } from "@/services/chat/chat";
import helper from "@/services/socket/helper";
import { PAGE_SIZE } from "@/config/constant";
import { Message } from "./component/Message";
import { useScrollEvent } from "@/hook/useScrollEvent";

export const ChatBox = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { chatTarget } = useChatStore();
  const { idUser } = useAuthStore();
  const fetchMessageDetail = async (cursor: string) => {
    const result = await getMessageDetailApi({
      pathVariable: {
        id: chatTarget as string,
      },
      queryParam: {
        cursor,
        limit: PAGE_SIZE,
      },
    });
    return result;
  };

  const { data, fetchNextPage } = useInfiniteQuery<
    IResponse<IResponseMessageDetail>
  >({
    queryKey: [chatTarget],
    enabled: !!chatTarget,
    retry: false,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.message.nextCursor;
      return nextCursor ?? undefined;
    },
    queryFn: ({ pageParam }) => fetchMessageDetail(pageParam as string),
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      return sendMessageApi({
        body: {
          sender: idUser as string,
          content: text,
          type: eTypeMessage.TEXT,
          conversationId: chatTarget as string,
        },
      });
    },
    retry: false,
    onSuccess: (response) => {
      queryClient.setQueryData(
        [chatTarget],
        (oldData: { pages: IResponse<IResponseMessageDetail>[] }) => {
          const cloneOldData = _.cloneDeep(oldData);
          cloneOldData.pages[0].message.messageConversation[0] = {
            ...oldData.pages[0].message.messageConversation[0],
            optimistic: false,
          };
          return cloneOldData;
        }
      );
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
        sender: idUser as string,
        content: text,
        type: eTypeMessage.TEXT,
        conversationId: chatTarget,
        optimistic: true,
      };

      queryClient.setQueryData(
        [chatTarget],
        (oldData: { pages: IResponse<IResponseMessageDetail>[] }) => {
          const cloneOldData = _.cloneDeep(oldData);
          cloneOldData.pages[0].message.messageConversation.unshift(
            optimisticMessage
          );

          return cloneOldData;
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

  useScrollEvent({
    divElement: divRef,
    delay: 300,
    event: (direction) => {
      if (direction === "top") {
        fetchNextPage();
      }
    },
  });

  return (
    <React.Fragment>
      <div className=" w-full h-full px-2  overflow-hidden">
        <div className="flex flex-col w-full bg-gray-600 h-full rounded-lg">
          <div className="w-full">
            {/* Header chat box */}
            <ChatBoxHeader />
          </div>
          <div
            className="flex w-full h-full flex-col-reverse p-2 overflow-y-auto"
            ref={divRef}
          >
            {data?.pages.map((page) => {
              return page.message.messageConversation.map((item) => (
                <Message messageDetail={item} state="success" key={item._id} />
              ));
            })}
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
