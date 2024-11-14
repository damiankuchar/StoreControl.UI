import { TooltipButton } from "@/components/ui/button";
import { useRoleStore } from "@/stores/role-store";
import { Plus } from "lucide-react";

const RolesDataTableToolbar = () => {
  const openCreateDialog = useRoleStore((state) => state.openCreateDialog);

  return (
    <div className="flex items-center gap-2">
      <TooltipButton className="rounded-full w-8 h-8" tooltip="Add role" onClick={() => openCreateDialog()}>
        <Plus className="w-4 h-4" />
      </TooltipButton>
    </div>
  );
};

export default RolesDataTableToolbar;
