import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import _ from "lodash";
import { addToast } from "@heroui/react";
import { NotifyConfig } from "./interface";
import { axiosClient } from "./config";
import { useAuthStore } from "@/store/auth.store";

export const ApiConfig = () => {
  const { accessToken } = useAuthStore();
  const handleSuccessResponse = (response: AxiosResponse<any, any>) => {
    const notifyMessage: NotifyConfig = _.get(response.config, "notifyConfig", {
      success: false,
    });

    if (notifyMessage && notifyMessage.success !== false) {
      addToast({
        title: "Successful",
        description:
          typeof notifyMessage.success === "string"
            ? notifyMessage.success
            : response.data?.message,
        color: "success",
        radius: "sm",
      });
    }

    return response.data;
  };

  const handleErrorResponse = (error: AxiosError<any, any>) => {
    const notifyMessage: NotifyConfig = _.get(error.config, "notifyConfig", {
      error: false,
    });

    if (notifyMessage?.error !== false) {
      addToast({
        title: "Error",
        description:
          typeof notifyMessage?.error === "string"
            ? notifyMessage.error
            : error.response?.data?.message,
        color: "danger",
        radius: "sm",
      });
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const interceptorsResponse = axiosClient.interceptors.response.use(
      (response) => {
        return handleSuccessResponse(response);
      },
      (error) => {
        return handleErrorResponse(error);
      }
    );
    const interceptorsRequest = axiosClient.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["client-time"] = new Date().toISOString();
        return config;
      }
    );
    return () => {
      axiosClient.interceptors.response.eject(interceptorsResponse);
      axiosClient.interceptors.request.eject(interceptorsRequest);
    };
  }, []);
  return null;
};
