import { callApi } from "../callApi";
import { IRequestParams, IResponse } from "../interface";
import { IConversationPreview, IMessageDetail } from "./chat.interface";

export const getListPreviewConversationApi = (
  params: IRequestParams<{ id: string }, null, null>
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
