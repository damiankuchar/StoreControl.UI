import { create } from "zustand";

type SheetFormType = "create" | "update" | "view";

interface UserStore {
  isSheetOpen: boolean;
  isDialogOpen: boolean;
  formType: SheetFormType | null;
  userId: string;

  openSheet: (formType: SheetFormType, userId?: string) => void;
  closeSheet: () => void;
  openDialog: (userId: string) => void;
  closeDialog: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isSheetOpen: false,
  isDialogOpen: false,
  formType: null,
  userId: "",

  openSheet: (formType, userId) => set(() => ({ isSheetOpen: true, formType: formType, userId: userId })),
  closeSheet: () => set(() => ({ isSheetOpen: false, formType: null, userId: "" })),
  openDialog: (userId) => set(() => ({ isDialogOpen: true, userId: userId })),
  closeDialog: () => set(() => ({ isDialogOpen: false, userId: "" })),
}));
