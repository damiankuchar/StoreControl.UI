import { TooltipButton } from "@/components/ui/button";
import { Create_Role } from "@/lib/permissions";
import { useAuthStore } from "@/stores/auth-store";
import { useRoleStore } from "@/stores/role-store";
import { Plus } from "lucide-react";

const RolesDataTableToolbar = () => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);
  const openCreateDialog = useRoleStore((state) => state.openCreateDialog);

  return (
    <div className="flex items-center gap-2">
      {hasPermissions([Create_Role]) ? (
        <TooltipButton className="rounded-full w-8 h-8" tooltip="Add role" onClick={() => openCreateDialog()}>
          <Plus className="w-4 h-4" />
        </TooltipButton>
      ) : null}
    </div>
  );
};

export default RolesDataTableToolbar;
