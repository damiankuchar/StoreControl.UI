import { CreateUserRequest, UpdateUserRequest, UserDetailedDto, UserDto } from "@/models/user-models";
import api from "@/utils/axios-instance";

export const getAllUsers = async () => {
  const response = await api.get<UserDto[]>("users");
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get<UserDetailedDto>(`users/${id}`);
  return response.data;
};

export const createUser = async (body: CreateUserRequest) => {
  const response = await api.post<UserDetailedDto>("users", body);
  return response.data;
};

export const updateUser = async (id: string, body: UpdateUserRequest) => {
  const response = await api.put<UserDetailedDto>(`users/${id}`, body);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`users/${id}`);
  return response.data;
}