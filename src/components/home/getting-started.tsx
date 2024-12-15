import Startup from "@/assets/startup.png";
import { Button } from "../ui/button";
import GettingStartedDialog from "./getting-started-dialog";
import { useCanvasStore } from "@/stores/canvas-store";

const GettingStarted = () => {
  const isGettingStartedDialogOpen = useCanvasStore((state) => state.isGettingStartedDialogOpen);
  const openGettingStartedDialog = useCanvasStore((state) => state.openGettingStartedDialog);
  const closeGettingStartedDialog = useCanvasStore((state) => state.closeGettingStartedDialog);

  return (
    <>
      <div className="flex flex-col flex-1 justify-center items-center gap-2">
        <img src={Startup} className="max-w-sm" />
        <div className="flex flex-col justify-center items-center gap-4 max-w-xl">
          <h1 className="text-4xl text-center font-bold">Create your first project</h1>
          <p className="text-base text-center">
            Set up your first production line by configuring machines and defining workflows to streamline operations.
          </p>
        </div>
        <div className="mt-2">
          <Button onClick={openGettingStartedDialog}>Get started!</Button>
        </div>
      </div>
      <GettingStartedDialog open={isGettingStartedDialogOpen} onOpenChange={closeGettingStartedDialog} />
    </>
  );
};

export default GettingStarted;
