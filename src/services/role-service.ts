import { RoleDto } from "@/models/user-models";
import api from "@/utils/axios-instance";

export const getAllRoles = async () => {
  const response = await api.get<RoleDto[]>("roles");
  return response.data;
};
