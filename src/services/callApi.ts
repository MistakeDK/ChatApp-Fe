import { AxiosResponse } from "axios";
import { axiosClient } from "./config";

export const callApi = ({
  url,
  pathVariable,
  body,
  queryParam,
  ...options
}: {
  url: string;
  pathVariable?: unknown;
  body?: unknown;
  queryParam?: unknown;
}) => {
  let formattedUrl = url;

  if (pathVariable) {
    formattedUrl = Object.keys(pathVariable).reduce(
      (acc, key) => acc.replace(`:${key}`, String((pathVariable as any)[key])),
      url
    );
  }
  return axiosClient({
    url: formattedUrl,
    data: body,
    params: queryParam,
    ...options,
  }) as Promise<AxiosResponse["data"]>;
};
