import { create } from "zustand";

interface RoleStore {
  isDeleteDialogOpen: boolean;
  roleId: string;
  openDeleteDialog: (userId: string) => void;
  closeDeleteDialog: () => void;
}

export const useRoleStore = create<RoleStore>()((set) => ({
  isDeleteDialogOpen: false,
  roleId: "",

  openDeleteDialog: (roleId) => set(() => ({ isDeleteDialogOpen: true, roleId: roleId })),
  closeDeleteDialog: () => set(() => ({ isDeleteDialogOpen: false, roleId: "" })),
}));
