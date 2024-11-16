import DeleteDialog from "@/components/common/delete-dialog";
import DataTable from "@/components/ui/data-table/data-table";
import DataTableToolbar from "@/components/ui/data-table/data-table-toolbar";
import { useDeletePermission } from "@/hooks/mutations/permission-mutations";
import { usePermissions } from "@/hooks/queries/permission-queries";
import { PermissionDto } from "@/models/permission-models";
import { usePermissionStore } from "@/stores/permission-store";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";
import PermissionDataTableToolbar from "./permissions-data-table-toolbar";
import PermissionSheet from "./permissions-sheet";

const fallbackData: PermissionDto[] = [];

const PermissionsDataTable = () => {
  const permissionId = usePermissionStore((state) => state.permissionId);
  const isSheetOpen = usePermissionStore((state) => state.isSheetOpen);
  const isDeleteDialogOpen = usePermissionStore((state) => state.isDeleteDialogOpen);
  const closeSheet = usePermissionStore((state) => state.closeSheet);
  const closeDeleteDialog = usePermissionStore((state) => state.closeDeleteDialog);

  const { data: permissions } = usePermissions();

  const [sorting, setSorting] = useState<SortingState>([]);

  const { mutate: deletePermission, isPending } = useDeletePermission();

  const table = useReactTable({
    data: permissions ?? fallbackData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  const dialogDeleteFn = () => {
    deletePermission(permissionId, {
      onSuccess: () => {
        toast.success("Permission has been successfully deleted!");
        closeDeleteDialog();
      },
    });
  };

  return (
    <>
      <DataTable table={table} pagination={false}>
        <DataTableToolbar table={table} exporting={true}>
          <PermissionDataTableToolbar table={table} />
        </DataTableToolbar>
      </DataTable>
      <PermissionSheet open={isSheetOpen} onOpenChange={closeSheet} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete permission."
        deleteFn={dialogDeleteFn}
        loading={isPending}
      />
    </>
  );
};

export default PermissionsDataTable;
