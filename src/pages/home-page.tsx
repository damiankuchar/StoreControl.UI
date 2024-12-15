import GettingStarted from "@/components/home/getting-started";
import HomeCanvas from "@/components/home/home-canvas";
import { Spinner } from "@/components/ui/spinner";
import { useProductionLines } from "@/hooks/queries/production-line-queries";
import { useCanvasStore } from "@/stores/canvas-store";
import { useEffect } from "react";

const HomePage = () => {
  const productionLine = useCanvasStore((state) => state.selectedProductionLine);
  const setSelectedProductionLine = useCanvasStore((state) => state.setSelectedProductionLine);

  const productionLinesQuery = useProductionLines();

  useEffect(() => {
    if (!productionLine && productionLinesQuery.data) {
      const initialProductionLine = productionLinesQuery.data?.at(-1) ?? null;
      setSelectedProductionLine(initialProductionLine);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productionLinesQuery.data]);

  if (productionLinesQuery.isPending || productionLinesQuery.isFetching) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return productionLine ? <HomeCanvas /> : <GettingStarted />;
};

export default HomePage;
