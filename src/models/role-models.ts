import { PermissionDto } from "./permission-models";

export interface RoleDto {
  id: string;
  name: string;
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
