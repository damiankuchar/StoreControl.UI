import { ProductionLineDto } from "@/models/production-line-models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CanvasStore {
  selectedProductionLine: ProductionLineDto | null;
  isGettingStartedDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  setSelectedProductionLine: (productionLine: ProductionLineDto | null) => void;
  openGettingStartedDialog: () => void;
  closeGettingStartedDialog: () => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set) => ({
      selectedProductionLine: null,
      isGettingStartedDialogOpen: false,
      isDeleteDialogOpen: false,

      setSelectedProductionLine: (productionLine) => set(() => ({ selectedProductionLine: productionLine })),
      openGettingStartedDialog: () => set(() => ({ isGettingStartedDialogOpen: true })),
      closeGettingStartedDialog: () => set(() => ({ isGettingStartedDialogOpen: false })),
      openDeleteDialog: () => set(() => ({ isDeleteDialogOpen: true })),
      closeDeleteDialog: () => set(() => ({ isDeleteDialogOpen: false })),
    }),
    {
      name: "canvas",
      partialize: (state) => ({ selectedProductionLine: state.selectedProductionLine }),
    },
  ),
);
