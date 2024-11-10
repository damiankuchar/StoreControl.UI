import { TooltipButton } from "@/components/ui/button";
import { useUserStore } from "@/stores/user-store";
import { Plus } from "lucide-react";

const UsersDataTableToolbar = () => {
  const openSheet = useUserStore((state) => state.openSheet);

  return (
    <div className="flex items-center gap-2">
      <TooltipButton className="rounded-full w-8 h-8" tooltip="Add user" onClick={() => openSheet("create")}>
        <Plus className="w-4 h-4" />
      </TooltipButton>
    </div>
  );
};

export default UsersDataTableToolbar;
