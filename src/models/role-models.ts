import { PermissionDto } from "./permission-models";

export interface RoleDto {
  id: string;
  name: string;
  description: string;
}

export interface RoleDetailedDto {
  id: string;
  name: string;
  description: string;
  permissions: PermissionDto[];
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface UpdateRoleRequest {
  name: string;
  description: string;
  permissionIds: string[];
}
