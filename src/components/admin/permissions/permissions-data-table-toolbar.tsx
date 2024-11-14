import { TooltipButton } from "@/components/ui/button";
import { usePermissionStore } from "@/stores/permission-store";
import { Plus } from "lucide-react";

const PermissionDataTableToolbar = () => {
  const openSheet = usePermissionStore((state) => state.openSheet);

  return (
    <div className="flex items-center gap-2">
      <TooltipButton className="rounded-full w-8 h-8" tooltip="Add permission" onClick={() => openSheet("create")}>
        <Plus className="w-4 h-4" />
      </TooltipButton>
    </div>
  );
};

export default PermissionDataTableToolbar;
