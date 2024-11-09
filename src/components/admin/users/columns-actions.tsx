import { TooltipButton } from "@/components/ui/button";
import { UserDto } from "@/models/user-models";
import { rootStore } from "@/stores/root-store";
import { Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ColumnActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<UserDto>;
}

const ColumnsActions = ({ row }: ColumnActionsProps) => {
  const { usersStore } = rootStore;

  return (
    <div className="flex flex-row justify-center gap-1">
      <TooltipButton
        tooltip="View user"
        className="rounded-full w-8 h-8"
        onClick={() => usersStore.openSheet("view", row.original.id)}
      >
        <Eye className="w-4 h-4 text-info" />
      </TooltipButton>
      <TooltipButton
        tooltip="Update user"
        className="rounded-full w-8 h-8"
        onClick={() => usersStore.openSheet("update", row.original.id)}
      >
        <Pencil className="w-4 h-4 text-success" />
      </TooltipButton>
      <TooltipButton
        tooltip="Delete user"
        className="rounded-full w-8 h-8"
        onClick={() => usersStore.openDeleteDialog(row.original.id)}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </TooltipButton>
    </div>
  );
};

export default ColumnsActions;