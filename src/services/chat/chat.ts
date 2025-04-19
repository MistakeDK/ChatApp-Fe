import { callApi } from "../callApi";
import { IQuerryPage, IRequestParams, IResponse } from "../interface";
import {
  IBodyCreateConversation,
  IBodySendMessage,
  IMessageDetail,
  IResponseGetListConversation,
} from "./chat.interface";

export const getListPreviewConversationApi = (
  params: IRequestParams<{ id: string }, IQuerryPage, null>
): Promise<IResponse<IResponseGetListConversation>> =>
  callApi({
    url: "/chat/:id",
    method: "GET",
    ...params,
  });

export const getOrCreateConversationApi = (
  params: IRequestParams<null, null, IBodyCreateConversation>
): Promise<IResponse<{ _id: string; isNew: boolean }>> =>
  callApi({
    url: "/chat",
    method: "POST",
    ...params,
  });

export const getMessageDetailApi = (
  params: IRequestParams<{ id: string }, null, null>
): Promise<IResponse<IMessageDetail[]>> =>
  callApi({
    url: "/chat/detail/:id",
    method: "GET",
    ...params,
  });

export const sendMessageApi = (
  params: IRequestParams<null, null, IBodySendMessage>
): Promise<IResponse<{ conversationId: string }>> =>
  callApi({
    url: "/chat/sendMessage",
    method: "POST",
    ...params,
  });
