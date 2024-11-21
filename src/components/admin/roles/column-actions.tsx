import { TooltipButton } from "@/components/ui/button";
import { Delete_Role, Update_Role } from "@/lib/permissions";
import { RoleDto } from "@/models/role-models";
import { useAuthStore } from "@/stores/auth-store";
import { useRoleStore } from "@/stores/role-store";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ColumnActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<RoleDto>;
}

const ColumnActions = ({ row }: ColumnActionsProps) => {
  const hasPermissions = useAuthStore((state) => state.hasPermissions);
  const openDialog = useRoleStore((state) => state.openDeleteDialog);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center gap-1">
      {hasPermissions([Update_Role]) ? (
        <TooltipButton
          tooltip="Update user"
          className="rounded-full w-8 h-8"
          onClick={() => navigate(`/admin/update-role/${row.original.id}`)}
        >
          <Pencil className="w-4 h-4 text-success" />
        </TooltipButton>
      ) : null}
      {hasPermissions([Delete_Role]) ? (
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

export default ColumnActions;
