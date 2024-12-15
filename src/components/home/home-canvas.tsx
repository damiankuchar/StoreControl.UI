import { useProductionLineById } from "@/hooks/queries/production-line-queries";
import { useCanvasStore } from "@/stores/canvas-store";
import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import CanvasToolbar from "./canvas-toolbar";

const HomeCanvas = () => {
  const productionLine = useCanvasStore((state) => state.selectedProductionLine);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const productionLineQuery = useProductionLineById(productionLine?.id ?? "");

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
    if (canvas && productionLineQuery.data) {
      canvas.loadFromJSON(productionLineQuery.data.canvasData).then((x) => x.renderAll());
    }
  }, [canvas, productionLineQuery.data]);

  return (
    <>
      {canvas ? <CanvasToolbar canvas={canvas} /> : null}
      <div className="flex w-full h-full overflow-x-auto justify-center items-center">
        <div className="min-w-[1px]">
          <canvas id="canvas" className="border border-white" ref={canvasRef} />
        </div>
      </div>
    </>
  );
};

export default HomeCanvas;
