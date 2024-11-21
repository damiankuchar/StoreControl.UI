import { TooltipButton } from "@/components/ui/button";
import { Create_User } from "@/lib/permissions";
import { useAuthStore } from "@/stores/auth-store";
import { useUserStore } from "@/stores/user-store";
import { Plus } from "lucide-react";

const UsersDataTableToolbar = () => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);
  const openSheet = useUserStore((state) => state.openSheet);

  return (
    <div className="flex items-center gap-2">
      {hasPermissions([Create_User]) ? (
        <TooltipButton className="rounded-full w-8 h-8" tooltip="Add user" onClick={() => openSheet("create")}>
          <Plus className="w-4 h-4" />
        </TooltipButton>
      ) : null}
    </div>
  );
};

export default UsersDataTableToolbar;
