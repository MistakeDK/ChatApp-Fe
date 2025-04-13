import { callApi } from "../callApi";
import { IQuerryPage, IRequestParams, IResponse } from "../interface";
import {
  IBodySendMessage,
  IConversationPreview,
  IMessageDetail,
} from "./chat.interface";

export const getListPreviewConversationApi = (
  params: IRequestParams<{ id: string }, IQuerryPage, null>
): Promise<IResponse<IConversationPreview[]>> =>
  callApi({
    url: "/chat/:id",
    method: "GET",
    ...params,
  });

export const getMessageDetail = (
  params: IRequestParams<{ id: string }, null, null>
): Promise<IResponse<IMessageDetail[]>> =>
  callApi({
    url: "/chat/detail/:id",
    method: "GET",
    ...params,
  });

export const sendMessage = (
  params: IRequestParams<null, null, IBodySendMessage>
): Promise<IResponse<{ conversationId: string }>> =>
  callApi({
    url: "/chat/sendMessage",
    method: "POST",
    ...params,
  });
