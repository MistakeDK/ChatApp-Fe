import { callApi } from "../callApi";
import { IRequestParams, IResponse } from "../interface";
import { IAuthInfo, IBodyLogin, IBodyRegister } from "./auth.interface";

export const loginApi = (
  params: IRequestParams<null, null, IBodyLogin>
): Promise<IResponse<IAuthInfo>> =>
  callApi({
    url: "/auth/login",
    method: "POST",
    ...params,
  });

export const getMeApi = (params: IRequestParams<{ id: string }, null, null>) =>
  callApi({
    url: "/auth/:id",
    method: "GET",
    ...params,
  });

export const registerApi = (
  params: IRequestParams<null, null, IBodyRegister>
) =>
  callApi({
    url: "/auth/register",
    method: "POST",
    ...params,
  });
