import { create } from "zustand";

interface RoleStore {
  roleId: string;
  isCreateDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  openDeleteDialog: (userId: string) => void;
  closeDeleteDialog: () => void;
}

export const useRoleStore = create<RoleStore>()((set) => ({
  roleId: "",
  isCreateDialogOpen: false,
  isDeleteDialogOpen: false,

  openCreateDialog: () => set(() => ({ isCreateDialogOpen: true })),
  closeCreateDialog: () => set(() => ({ isCreateDialogOpen: false })),
  openDeleteDialog: (roleId) => set(() => ({ isDeleteDialogOpen: true, roleId: roleId })),
  closeDeleteDialog: () => set(() => ({ isDeleteDialogOpen: false, roleId: "" })),
}));
