import { Button, TooltipButton } from "@/components/ui/button";
import { useRoleById } from "@/hooks/queries/role-queries";
import { PermissionDto } from "@/models/permission-models";
import { usePermissionStore } from "@/stores/permission-store";
import { RowSelectionState, Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

interface PermissionDataTableToolbarProps {
  table: Table<PermissionDto>;
}

const PermissionDataTableToolbar = ({ table }: PermissionDataTableToolbarProps) => {
  const flatRows = table.getRowModel().flatRows;
  const { roleId } = useParams();
  const openSheet = usePermissionStore((state) => state.openSheet);

  const { data: role } = useRoleById(roleId ?? "");

  const rolePermissionIds = useMemo(() => {
    return role?.permissions.map((permission) => permission.id);
  }, [role]);

  const initPermissionsSelection = useCallback(() => {
    if (!rolePermissionIds) {
      return;
    }

    const initialRowIds = flatRows.filter((row) => rolePermissionIds.includes(row.original.id)).map((row) => row.id);
    const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.id);

    // If there is no changes return to avoid unnecessary re-render
    if (initialRowIds.every((item) => selectedRows.includes(item))) {
      return;
    }

    const rowSelectionState: RowSelectionState = initialRowIds.reduce((dict, item) => {
      dict[item] = true;
      return dict;
    }, {} as RowSelectionState);

    table.setRowSelection(rowSelectionState);
  }, [flatRows, rolePermissionIds, table]);

  useEffect(() => {
    if (rolePermissionIds) {
      initPermissionsSelection();
    }
  }, [rolePermissionIds, flatRows, initPermissionsSelection]);

  const onSubmit = () => {
    const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original.id);

    // console.log("Selected rows:", selectedRows);
    // console.log("Role permission:", rolePermissionIds);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSubmit()}>
          Save Changes
        </Button>
        <Button variant="outline" size="sm" onClick={() => initPermissionsSelection()}>
          Reset Changes
        </Button>
      </div>
      <TooltipButton className="rounded-full w-8 h-8" tooltip="Add permission" onClick={() => openSheet("create")}>
        <Plus className="w-4 h-4" />
      </TooltipButton>
    </div>
  );
};

export default PermissionDataTableToolbar;
