export interface PermissionDto {
  id: string;
  name: string;
}

export interface CreatePermissionRequest {
  name: string;
}

export interface UpdatePermissionRequest {
  name: string;
}
