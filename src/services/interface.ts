import { AxiosRequestConfig } from "axios";

export interface NotifyConfig {
  success?: string | boolean;
  error?: string | boolean;
}

export interface IResponse<T> {
  message: T;
  timestamp: string;
  statusCode: number;
}

export type IBaseConfig = Omit<AxiosRequestConfig, "params" | "data"> & {
  notifyConfig?: NotifyConfig;
};

export type IRequestDynamicParams<P = null, Q = null, B = null> = P extends null
  ? Q extends null
    ? B extends null
      ? IRequestParamWithoutAny
      : IRequestParamWithOnlyBody<B>
    : B extends null
    ? IRequestParamWithOnlyQueryParam<Q>
    : IRequestParamWithoutPathVariable<Q, B>
  : Q extends null
  ? B extends null
    ? IRequestParamWithOnlyPathVariable<P>
    : IRequestParamWithoutQueryParam<P, B>
  : B extends null
  ? IRequestParamWithoutBody<P, Q>
  : IRequestParamWithAll<P, Q, B>;

export type IRequestParams<P = null, Q = null, B = null> = IBaseConfig &
  IRequestDynamicParams<P, Q, B>;

export type IRequestParamWithoutBody<P, Q> = {
  pathVariable: P;
  queryParam: Q;
};

export type IRequestParamWithoutPathVariable<Q, B> = {
  queryParam: Q;
  body: B;
};

export type IRequestParamWithoutQueryParam<P, B> = {
  pathVariable: P;
  body: B;
};

export type IRequestParamWithOnlyPathVariable<P> = {
  pathVariable: P;
};

export type IRequestParamWithOnlyQueryParam<Q> = {
  queryParam: Q;
};

export type IRequestParamWithOnlyBody<B> = {
  body: B;
};

export type IRequestParamWithAll<P, Q, B> = {
  pathVariable: P;
  queryParam: Q;
  body: B;
};

export type IRequestParamWithoutAny = {
  pathVariable?: undefined;
  queryParam?: undefined;
  body?: undefined;
}; // Không có tham số nào

export interface IQuerryPage {
  limit: number;
  page: number;
}
