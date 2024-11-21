import { Button, TooltipButton } from "@/components/ui/button";
import { Create_Permission, Update_Role } from "@/lib/permissions";
import { useAuthStore } from "@/stores/auth-store";
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
  const hasPermissions = useAuthStore((state) => state.hasPermissions);
  const openSheet = usePermissionStore((state) => state.openSheet);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {hasPermissions([Update_Role]) ? (
          <Button size="sm" onClick={saveChangesFn} loading={isLoading}>
            Save Changes
          </Button>
        ) : null}
        <Button variant="outline" size="sm" onClick={resetSelectionFn}>
          Reset Changes
        </Button>
      </div>
      {hasPermissions([Create_Permission]) ? (
        <TooltipButton className="rounded-full w-8 h-8" tooltip="Add permission" onClick={() => openSheet("create")}>
          <Plus className="w-4 h-4" />
        </TooltipButton>
      ) : null}
    </div>
  );
};

export default PermissionDataTableToolbar;
