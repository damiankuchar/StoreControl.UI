import { useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";

const HomeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current);

      initCanvas.setDimensions(
        {
          width: "100%",
          height: "100%",
        },
        {
          cssOnly: true,
        },
      );

      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <div className="flex w-full h-full overflow-x-auto justify-center">
      <div className="min-w-[1px]">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </div>
  );
};

export default HomeCanvas;
