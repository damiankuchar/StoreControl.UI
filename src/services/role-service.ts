import { RoleDto } from "@/models/role-models";
import api from "@/utils/axios-instance";

export const getAllRoles = async () => {
  const response = await api.get<RoleDto[]>("roles");
  return response.data;
};

export const deleteRole = async (id: string) => {
  const response = await api.delete(`roles/${id}`);
  return response.data;
};
