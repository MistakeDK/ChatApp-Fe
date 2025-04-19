import { callApi } from "../callApi";
import { IRequestParams, IResponse } from "../interface";
import { IUserQuerry, IUserSearchResponse } from "./user.interface";

export const findUserByName = (
  params: IRequestParams<null, IUserQuerry, null>
): Promise<IResponse<IUserSearchResponse>> =>
  callApi({
    url: "/users/findByName",
    method: "GET",
    ...params,
  });
