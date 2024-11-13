import { ApiErrorDescription, ApiErrorResponse } from "@/models/api-error-models";
import { refresh } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    const isAuth = useAuthStore.getState().isAuth;

    if (isAuth()) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError<ApiErrorResponse>) => {
    const token = useAuthStore.getState().token ?? "";
    const refreshToken = useAuthStore.getState().refreshToken ?? "";
    const isTokenExpiredFn = useAuthStore.getState().isTokenExpired;
    const isAuth = useAuthStore.getState().isAuth;
    const setTokens = useAuthStore.getState().setTokens;
    const clearTokens = useAuthStore.getState().clearTokens;

    const orginalRequest = error.config;
    const isTokenExpired = error.response?.status === 401 && isTokenExpiredFn();

    if (isTokenExpired) {
      try {
        const response = await refresh({ token: token, refreshToken: refreshToken });
        setTokens(response.token, response.refreshToken);
      } catch {
        clearTokens();
      }

      if (isAuth() && orginalRequest?.headers) {
        orginalRequest.headers.Authorization = `Bearer ${token}`;

        return api(orginalRequest);
      }
    }

    const { errorTitle, errorDescription } = getErrorMessage(error);

    toast.error(errorTitle, {
      description: errorDescription,
    });

    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: AxiosError<ApiErrorResponse>): ApiErrorDescription => {
  switch (error.response?.status) {
    case 400:
      return {
        errorTitle: "Bad Request",
        errorDescription: error.response?.data.message ?? "An unknown error occurred.",
      };
    case 401:
      return {
        errorTitle: "Unauthorized",
        errorDescription: "Your session has expired. Please log in again to continue.",
      };
    case 403:
      return {
        errorTitle: "Forbidden",
        errorDescription: "Access Forbidden. You don't have permission to access requested resource.",
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
