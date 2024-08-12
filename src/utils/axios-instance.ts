import { toast } from "@/components/ui/use-toast";
import { ApiErrorDescription, ApiErrorResponse } from "@/models/api-error-models";
import { rootStore } from "@/stores/root-store";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    const { authStore } = rootStore;

    if (authStore.isAuth) {
      req.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return req;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<ApiErrorResponse>) => {
    const { errorTitle, errorDescription } = getErrorMessage(error);

    toast({
      title: errorTitle,
      description: errorDescription,
      variant: "destructive",
    });

    return Promise.reject(error);
  },
);

const getErrorMessage = (error: AxiosError<ApiErrorResponse>): ApiErrorDescription => {
  switch (error.response?.status) {
    case 400:
      return {
        errorTitle: "Bad Request",
        errorDescription: error.response?.data.message ?? "An unknown error occurred.",
      };
    case 404:
      return {
        errorTitle: "Not Found Error",
        errorDescription: "Requested resource was not found on the server.",
      };
    case 500:
      return {
        errorTitle: "Internal Server Error",
        errorDescription: "Server error. Please try again later.",
      };
    default:
      return {
        errorTitle: "Unknown error",
        errorDescription: "An unexpected error occurred.",
      };
  }
};

export default api;
