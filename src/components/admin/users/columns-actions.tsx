import { TooltipButton } from "@/components/ui/button";
import { Delete_User, Read_User, Update_User } from "@/lib/permissions";
import { UserDto } from "@/models/user-models";
import { useAuthStore } from "@/stores/auth-store";
import { useUserStore } from "@/stores/user-store";
import { Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ColumnActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<UserDto>;
}

const ColumnsActions = ({ row }: ColumnActionsProps) => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);
  const openSheet = useUserStore((state) => state.openSheet);
  const openDialog = useUserStore((state) => state.openDialog);

  return (
    <div className="flex flex-row justify-center gap-1">
      {hasPermissions([Read_User]) ? (
        <TooltipButton
          tooltip="View user"
          className="rounded-full w-8 h-8"
          onClick={() => openSheet("view", row.original.id)}
        >
          <Eye className="w-4 h-4 text-info" />
        </TooltipButton>
      ) : null}
      {hasPermissions([Update_User]) ? (
        <TooltipButton
          tooltip="Update user"
          className="rounded-full w-8 h-8"
          onClick={() => openSheet("update", row.original.id)}
        >
          <Pencil className="w-4 h-4 text-success" />
        </TooltipButton>
      ) : null}
      {hasPermissions([Delete_User]) ? (
        <TooltipButton
          tooltip="Delete user"
          className="rounded-full w-8 h-8"
          onClick={() => openDialog(row.original.id)}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </TooltipButton>
      ) : null}
    </div>
  );
};

export default ColumnsActions;
