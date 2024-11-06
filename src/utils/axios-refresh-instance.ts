import { ApiErrorResponse } from "@/models/api-error-models";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getErrorMessage } from "./axios-instance";
import globalRouter from "@/router/global-router";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL;

const axiosRefreshTokenInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRefreshTokenInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError<ApiErrorResponse>) => {
    const { errorTitle, errorDescription } = getErrorMessage(error);

    toast.error(errorTitle, {
      description: errorDescription,
    });

    if (globalRouter.navigate) {
      globalRouter.navigate("/login");
    }

    return Promise.reject(error);
  },
);

export default axiosRefreshTokenInstance;
