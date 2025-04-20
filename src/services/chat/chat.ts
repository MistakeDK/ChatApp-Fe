import { callApi } from "../callApi";
import {
  IQuerryCursor,
  IQuerryPage,
  IRequestParams,
  IResponse,
} from "../interface";
import {
  IBodyCreateConversation,
  IBodySendMessage,
  IResponseGetListConversation,
  IResponseMessageDetail,
  IResponseSendMessage,
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
  params: IRequestParams<{ id: string }, IQuerryCursor, null>
): Promise<IResponse<IResponseMessageDetail>> =>
  callApi({
    url: "/chat/detail/:id",
    method: "GET",
    ...params,
  });

export const sendMessageApi = (
  params: IRequestParams<null, null, IBodySendMessage>
): Promise<IResponse<IResponseSendMessage>> =>
  callApi({
    url: "/chat/sendMessage",
    method: "POST",
    ...params,
  });
