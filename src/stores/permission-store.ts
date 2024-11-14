import { create } from "zustand";

type SheetFormType = "create" | "update";

interface PermissionStore {
  permissionId: string;
  formType: SheetFormType | null;
  isSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  openSheet: (formType: SheetFormType, permissionId?: string) => void;
  closeSheet: () => void;
  openDeleteDialog: (permissionId: string) => void;
  closeDeleteDialog: () => void;
}

export const usePermissionStore = create<PermissionStore>()((set) => ({
  permissionId: "",
  formType: null,
  isSheetOpen: false,
  isDeleteDialogOpen: false,

  openSheet: (formType, permissionId) =>
    set(() => ({ isSheetOpen: true, formType: formType, permissionId: permissionId })),
  closeSheet: () => set(() => ({ isSheetOpen: false, formType: null, permissionId: "" })),
  openDeleteDialog: (permissionId) => set(() => ({ isDeleteDialogOpen: true, permissionId: permissionId })),
  closeDeleteDialog: () => set(() => ({ isDeleteDialogOpen: false })),
}));
