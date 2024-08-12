import { LoginRequest, LoginResponse } from "@/models/auth-models";
import api from "@/utils/axios-instance";

export const login = async (body: LoginRequest) => {
    const response = await api.post<LoginResponse>("auth/login", body);
    return response.data;
}