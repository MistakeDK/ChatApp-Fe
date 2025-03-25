import { callApi } from "../callApi";
import { IRequestParams, IResponse } from "../interface";
import { IConversationPreview } from "./chat.interface";

export const getListPreviewConversationApi = (
  params: IRequestParams<{ id: string }, null, null>
): Promise<IResponse<IConversationPreview[]>> =>
  callApi({
    url: "/chat/:id",
    method: "GET",
    ...params,
  });
