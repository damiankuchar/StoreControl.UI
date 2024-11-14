import { create } from "zustand";

type SheetFormType = "create" | "update" | "view";

interface UserStore {
  userId: string;
  formType: SheetFormType | null;
  isSheetOpen: boolean;
  isDialogOpen: boolean;

  openSheet: (formType: SheetFormType, userId?: string) => void;
  closeSheet: () => void;
  openDialog: (userId: string) => void;
  closeDialog: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  userId: "",
  formType: null,
  isSheetOpen: false,
  isDialogOpen: false,

  openSheet: (formType, userId) => set(() => ({ isSheetOpen: true, formType: formType, userId: userId })),
  closeSheet: () => set(() => ({ isSheetOpen: false, formType: null, userId: "" })),
  openDialog: (userId) => set(() => ({ isDialogOpen: true, userId: userId })),
  closeDialog: () => set(() => ({ isDialogOpen: false, userId: "" })),
}));
