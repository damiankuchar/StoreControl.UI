export interface RoleDto {
  id: string;
  name: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  roleIds: string[];
}

export interface UserDetailedDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  registrationDate: string;
  roles: RoleDto[];
}
