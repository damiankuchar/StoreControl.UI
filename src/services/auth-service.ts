import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse } from "@/models/auth-models";
import api from "@/utils/axios-instance";
import axiosRefreshTokenInstance from "@/utils/axios-refresh-instance";

export const login = async (body: LoginRequest) => {
  const response = await api.post<LoginResponse>("auth/login", body);
  return response.data;
};

export const refresh = async (body: RefreshRequest) => {
  const response = await axiosRefreshTokenInstance.post<RefreshResponse>("auth/refresh", body);
  return response.data;
}