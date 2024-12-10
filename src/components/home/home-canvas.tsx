import { useCreateProductionLine, useDeleteProductionLine } from "@/hooks/mutations/production-line-mutations";
import { useProductionLineById } from "@/hooks/queries/production-line-queries";
import { CreateProductionLineRequest } from "@/models/production-line-models";
import { useCanvasStore } from "@/stores/canvas-store";
import { Canvas, Rect } from "fabric";
import { Save, Square, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import DeleteDialog from "../common/delete-dialog";
import { Button } from "../ui/button";

const HomeCanvas = () => {
  const productionLine = useCanvasStore((state) => state.selectedProductionLine);
  const isDeleteDialogOpen = useCanvasStore((state) => state.isDeleteDialogOpen);
  const openDeleteDialog = useCanvasStore((state) => state.openDeleteDialog);
  const closeDeleteDialog = useCanvasStore((state) => state.closeDeleteDialog);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const { data: dbProductionLine } = useProductionLineById(productionLine?.id ?? "");
  const { mutate: createProductionLine } = useCreateProductionLine();
  const { mutate: deleteProductionLine, isPending: isDeleteProductionLinePending } = useDeleteProductionLine();

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 1024,
        height: 580,
      });

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  // Canvas loading effect - if loading is above it throws an error (but it still works)
  useEffect(() => {
    if (canvas && dbProductionLine) {
      canvas.loadFromJSON(dbProductionLine.canvasData).then((x) => x.renderAll());
    }
  }, [canvas, dbProductionLine]);

  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "red",
      });

      canvas.add(rect);
    }
  };

  const saveProductionLine = () => {
    if (canvas) {
      const request: CreateProductionLineRequest = {
        canvasData: canvas.toJSON(),
      };
      createProductionLine(request, {
        onSuccess: () => {
          toast.success("Successfully added new production line.");
        },
      });
    }
  };

  const dialogDeleteFn = () => {
    if (productionLine) {
      deleteProductionLine(productionLine.id, {
        onSuccess: () => {
          toast.success("Production line has been successfully deleted!");
          closeDeleteDialog();
        },
      });
    }
  };

  return (
    <>
      <div className="fixed top-1/2 transform -translate-y-1/2 right-4 flex flex-col gap-2 z-10 bg-primary-foreground rounded-lg">
        <Button variant="ghost" onClick={addRectangle}>
          <Square />
        </Button>
        <Button variant="ghost" onClick={saveProductionLine}>
          <Save />
        </Button>
        <Button variant="ghost" onClick={openDeleteDialog}>
          <Trash2 />
        </Button>
      </div>
      <div className="flex w-full h-full overflow-x-auto justify-center items-center">
        <div className="min-w-[1px]">
          <canvas id="canvas" className="border border-white" ref={canvasRef} />
        </div>
      </div>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete production line."
        deleteFn={dialogDeleteFn}
        loading={isDeleteProductionLinePending}
      />
    </>
  );
};

export default HomeCanvas;
