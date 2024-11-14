import { TooltipButton } from "@/components/ui/button";
import { PermissionDto } from "@/models/permission-models";
import { usePermissionStore } from "@/stores/permission-store";
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

interface ColumnActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<PermissionDto>;
}

const ColumnsActions = ({ row }: ColumnActionsProps) => {
  const openSheet = usePermissionStore((state) => state.openSheet);
  const openDeleteDialog = usePermissionStore((state) => state.openDeleteDialog);

  return (
    <div className="flex flex-row justify-center gap-1">
      <TooltipButton
        tooltip="Update permission"
        className="rounded-full w-8 h-8"
        onClick={() => openSheet("update", row.original.id)}
      >
        <Pencil className="w-4 h-4 text-success" />
      </TooltipButton>
      <TooltipButton
        tooltip="Delete permission"
        className="rounded-full w-8 h-8"
        onClick={() => openDeleteDialog(row.original.id)}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </TooltipButton>
    </div>
  );
};

export default ColumnsActions;
