import { CreateUserRequest, RoleDto, UserDetailedDto, UserDto } from "@/models/user-models";
import api from "@/utils/axios-instance";

export const getAllRoles = async () => {
  const response = await api.get<RoleDto[]>("roles");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get<UserDto[]>("users");
  return response.data;
};

export const createUser = async (body: CreateUserRequest) => {
  const response = await api.post<UserDetailedDto>("users", body);
  return response.data;
};
