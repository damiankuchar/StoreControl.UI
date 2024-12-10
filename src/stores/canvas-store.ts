import { ProductionLineDto } from "@/models/production-line-models";
import { create } from "zustand";

interface CanvasStore {
  selectedProductionLine: ProductionLineDto | null;
  isDeleteDialogOpen: boolean;
  setSelectedProductionLine: (productionLine: ProductionLineDto) => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
}

export const useCanvasStore = create<CanvasStore>()((set) => ({
  selectedProductionLine: null,
  isDeleteDialogOpen: false,

  setSelectedProductionLine: (productionLine) => set(() => ({ selectedProductionLine: productionLine })),
  openDeleteDialog: () => set(() => ({ isDeleteDialogOpen: true })),
  closeDeleteDialog: () => set(() => ({ isDeleteDialogOpen: false, selectedProductionLine: null })),
}));
