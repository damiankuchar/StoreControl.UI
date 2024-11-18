import { Button, TooltipButton } from "@/components/ui/button";
import { usePermissionStore } from "@/stores/permission-store";
import { Plus } from "lucide-react";

interface PermissionDataTableToolbarProps {
  isLoading: boolean;
  saveChangesFn: () => void;
  resetSelectionFn: () => void;
}

const PermissionDataTableToolbar = ({
  isLoading,
  saveChangesFn,
  resetSelectionFn,
}: PermissionDataTableToolbarProps) => {
  const openSheet = usePermissionStore((state) => state.openSheet);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <Button size="sm" onClick={saveChangesFn} loading={isLoading}>
          Save Changes
        </Button>
        <Button variant="outline" size="sm" onClick={resetSelectionFn}>
          Reset Changes
        </Button>
      </div>
      <TooltipButton className="rounded-full w-8 h-8" tooltip="Add permission" onClick={() => openSheet("create")}>
        <Plus className="w-4 h-4" />
      </TooltipButton>
    </div>
  );
};

export default PermissionDataTableToolbar;
