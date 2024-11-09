import { CreateUserRequest, RoleDto, UpdateUserRequest, UserDetailedDto, UserDto } from "@/models/user-models";
import { createUser, deleteUser, getAllRoles, getAllUsers, getUserById, updateUser } from "@/services/user-service";
import { makeAutoObservable } from "mobx";
import { Option } from "@/components/ui/multiple-selector";
import { CreateUserFormData as UserFormData } from "@/components/admin/register-user/register-user-form";
import moment from "moment";
import { toast } from "sonner";

export type UserFormActionType = "create" | "update" | "view";

export class UsersStore {
  userId: string = "";
  users: UserDto[] = [];
  roles: RoleDto[] = [];
  userDetails: UserDetailedDto | undefined;

  loading: boolean = false;

  isSheetOpen: boolean = false;
  sheetTitle: string = "";
  sheetDescription: string = "";
  buttonText: string = "";
  action: UserFormActionType = "create";

  isDeleteDialogOpen: boolean = false;

  deleteLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getAllUsers() {
    this.users = await getAllUsers();

    this.users.forEach((user) => {
      user.registrationDate = moment(user.registrationDate).format("DD.MM.YYYY");
    });
  }

  async getAllRoles() {
    this.roles = await getAllRoles();
  }

  async userFormSubmit(userFormData: UserFormData) {
    try {
      this.loading = true;

      if (this.action === "create") {
        const createUserRequest = this.mapUserFormDataToCreateRequest(userFormData);
        const response = await createUser(createUserRequest);

        if (response) {
          toast.success("User has been created successfully!");

          this.loading = false;
          return true;
        }
      } else if (this.action === "update") {
        if (this.userDetails) {
          const updateUserRequest = this.mapUserFormDataToUpdateRequest(userFormData);
          const response = await updateUser(this.userDetails.id, updateUserRequest);

          if (response) {
            toast.success("User has been updated successfully");

            this.loading = false;
            return true;
          }
        }
      }

      this.loading = false;

      return false;
    } catch {
      this.loading = false;
    }
  }

  async deleteUser() {
    try {
      this.deleteLoading = true;

      await deleteUser(this.userId);

      this.isDeleteDialogOpen = false;

      await this.getAllUsers();

      toast.success("Successfully deleted user");

      this.deleteLoading = false;
    } catch {
      this.deleteLoading = false;
    }
  }

  async openSheet(action: UserFormActionType, id?: string) {
    if (id) {
      this.userDetails = await getUserById(id);
    }

    this.action = action;
    this.setSheetTitleAndDescription();
    this.isSheetOpen = true;
  }

  closeSheet() {
    this.userDetails = undefined;
    this.isSheetOpen = false;
  }

  openDeleteDialog(userId: string) {
    this.isDeleteDialogOpen = true;
    this.userId = userId;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = false;
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

  get createUserFormDefaultValues(): UserFormData {
    if (this.userDetails) {
      return {
        username: this.userDetails.username,
        email: this.userDetails.email,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        password: "",
        confirmPassword: "",
        roles: this.userDetails.roles.map((role) => ({
          value: role.id,
          label: role.name,
          disable: false,
        })),
      };
    }

    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      roles: [],
    };
  }

  get isFormViewMode() {
    return this.action === "view";
  }

  get isFormUpdateMode() {
    return this.action === "update";
  }

  private mapUserFormDataToCreateRequest(formData: UserFormData): CreateUserRequest {
    return {
      username: formData.username,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      roleIds: formData.roles.map((role) => role.value),
    };
  }

  private mapUserFormDataToUpdateRequest(formData: UserFormData): UpdateUserRequest {
    return {
      roleIds: formData.roles.map((role) => role.value),
    };
  }

  private setSheetTitleAndDescription() {
    switch (this.action) {
      case "create":
        this.sheetTitle = "Create New User";
        this.sheetDescription = "Add a new user to the system.";
        this.buttonText = "Create user";
        break;
      case "update":
        this.sheetTitle = "Update User";
        this.sheetDescription = "Modify user information.";
        this.buttonText = "Update user";
        break;
      case "view":
        this.sheetTitle = "View User Profile";
        this.sheetDescription = "Review user details.";
        this.buttonText = "Close";
        break;
    }
  }
}
