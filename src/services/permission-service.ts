import { CreatePermissionRequest, PermissionDto, UpdatePermissionRequest } from "@/models/permission-models";
import api from "@/utils/axios-instance";

export const getAllPermissions = async () => {
  const response = await api.get<PermissionDto[]>("permissions");
  return response.data;
};

export const getPermissionById = async (id: string) => {
  const response = await api.get<PermissionDto>(`permissions/${id}`);
  return response.data;
};

export const createPermission = async (body: CreatePermissionRequest) => {
  const response = await api.post<PermissionDto>("permissions", body);
  return response.data;
};

export const updatePermission = async (id: string, body: UpdatePermissionRequest) => {
  const response = await api.put<PermissionDto>(`permissions/${id}`, body);
  return response.data;
};

export const deletePermission = async (id: string) => {
  const response = await api.delete(`permissions/${id}`);
  return response.data;
};
