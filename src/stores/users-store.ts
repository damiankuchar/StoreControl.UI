import { CreateUserRequest, RoleDto } from "@/models/user-models";
import { createUser, getAllRoles } from "@/services/user-service";
import { makeAutoObservable } from "mobx";
import { Option } from "@/components/ui/multiple-selector";
import { CreateUserFormData } from "@/components/admin/register-user-form";
import { toast } from "@/components/ui/use-toast";

export class UsersStore {
  roles: RoleDto[] = [];
  temp: string = "";
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getAllRoles() {
    this.roles = await getAllRoles();
  }

  async createUser(createUserFormData: CreateUserFormData) {
    try {
      this.loading = true;

      const createUserRequest = this.mapCreateUserFormDataToRequest(createUserFormData);
      const response = await createUser(createUserRequest);

      if (response) {
        toast({
          title: "Success",
          description: "User has been created successfully!",
          variant: "default",
        });
      }

      this.loading = false;
    } catch {
      this.loading = false;
    }
  }

  get roleOptions() {
    return this.roles.map(
      (role) =>
        ({
          label: role.name,
          value: role.id,
          disable: false,
        }) as Option,
    );
  }

  private mapCreateUserFormDataToRequest(formData: CreateUserFormData) {
    return {
      username: formData.username,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      roleIds: formData.roles.map((role) => role.value),
    } as CreateUserRequest;
  }
}