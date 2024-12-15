import { useCanvasStore } from "@/stores/canvas-store";
import { Canvas, Rect } from "fabric";
import { FilePlus2, Save, Square, Trash2, Upload } from "lucide-react";
import { Button, TooltipButton } from "../ui/button";
import { UpdateProductionLineRequest } from "@/models/production-line-models";
import { toast } from "sonner";
import { useUpdateProductionLine, useDeleteProductionLine } from "@/hooks/mutations/production-line-mutations";
import GettingStartedDialog from "./getting-started-dialog";
import DeleteDialog from "../common/delete-dialog";

interface CanvasToolbarProps {
  canvas: Canvas;
}

const CanvasToolbar = ({ canvas }: CanvasToolbarProps) => {
  const productionLine = useCanvasStore((state) => state.selectedProductionLine);
  const isGettingStartedDialogOpen = useCanvasStore((state) => state.isGettingStartedDialogOpen);
  const isDeleteDialogOpen = useCanvasStore((state) => state.isDeleteDialogOpen);
  const openDeleteDialog = useCanvasStore((state) => state.openDeleteDialog);
  const closeDeleteDialog = useCanvasStore((state) => state.closeDeleteDialog);
  const openGettingStartedDialog = useCanvasStore((state) => state.openGettingStartedDialog);
  const closeGettingStartedDialog = useCanvasStore((state) => state.closeGettingStartedDialog);
  const setSelectedProductionLine = useCanvasStore((state) => state.setSelectedProductionLine);

  const updateProductionLineMutation = useUpdateProductionLine();
  const deleteProductionLineMutation = useDeleteProductionLine();

  const addRectangle = () => {
    const rect = new Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 60,
      fill: "red",
    });

    canvas.add(rect);
  };

  const updateProductionLine = () => {
    if (canvas && productionLine) {
      const request: UpdateProductionLineRequest = {
        name: productionLine.name,
        description: productionLine.description,
        canvasData: canvas.toJSON(),
      };

      updateProductionLineMutation.mutate(
        { id: productionLine.id, data: request },
        {
          onSuccess: () => {
            toast.success("Successfully updated production line");
          },
        },
      );
    }
  };

  const dialogDeleteFn = () => {
    if (productionLine) {
      deleteProductionLineMutation.mutate(productionLine.id, {
        onSuccess: () => {
          toast.success("Production line has been successfully deleted!");
          setSelectedProductionLine(null);
          closeDeleteDialog();
        },
      });
    }
  };

  const uploadSvgFile = () => {};

  return (
    <>
      <div className="fixed top-1/2 transform -translate-y-1/2 right-4 flex flex-col gap-2 z-10 bg-primary-foreground rounded-lg">
        <Button variant="ghost" onClick={addRectangle}>
          <Square />
        </Button>
        <TooltipButton tooltip="Upload" variant="ghost" size="default" onClick={uploadSvgFile}>
          <Upload />
        </TooltipButton>
        <TooltipButton tooltip="Create" variant="ghost" size="default" onClick={openGettingStartedDialog}>
          <FilePlus2 />
        </TooltipButton>
        <TooltipButton tooltip="Update" variant="ghost" size="default" onClick={updateProductionLine}>
          <Save />
        </TooltipButton>
        <TooltipButton tooltip="Delete" variant="ghost" size="default" onClick={openDeleteDialog}>
          <Trash2 />
        </TooltipButton>
      </div>
      <GettingStartedDialog open={isGettingStartedDialogOpen} onOpenChange={closeGettingStartedDialog} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete production line."
        deleteFn={dialogDeleteFn}
        loading={deleteProductionLineMutation.isPending}
      />
    </>
  );
};

export default CanvasToolbar;
