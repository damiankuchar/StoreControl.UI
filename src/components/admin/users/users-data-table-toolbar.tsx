import { TooltipButton } from "@/components/ui/button";
import { rootStore } from "@/stores/root-store";
import { Plus } from "lucide-react";

const UsersDataTableToolbar = () => {
  const { usersStore } = rootStore;

  return (
    <div className="flex items-center gap-2">
      <TooltipButton className="rounded-full w-8 h-8" tooltip="Add user" onClick={() => usersStore.openSheet("create")}>
        <Plus className="w-4 h-4" />
      </TooltipButton>
    </div>
  );
};

export default UsersDataTableToolbar;
