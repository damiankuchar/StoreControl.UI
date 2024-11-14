import { RoleDto } from "@/models/role-models";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/ui/data-table/data-table";
import DataTableToolbar from "@/components/ui/data-table/data-table-toolbar";
import { useRoles } from "@/hooks/queries/role-queries";
import DeleteDialog from "@/components/common/delete-dialog";
import { useRoleStore } from "@/stores/role-store";
import { useDeleteRole } from "@/hooks/mutations/role-mutations";
import { toast } from "sonner";
import RolesDataTableToolbar from "./roles-data-table-toolbar";
import CreateRoleDialog from "./create-role-dialog";

const fallbackData: RoleDto[] = [];

const RolesDataTable = () => {
  const roleId = useRoleStore((state) => state.roleId);
  const isCreateDialogOpen = useRoleStore((state) => state.isCreateDialogOpen);
  const isDialogOpen = useRoleStore((state) => state.isDeleteDialogOpen);
  const closeCreateDialog = useRoleStore((state) => state.closeCreateDialog);
  const closeDeleteDialog = useRoleStore((state) => state.closeDeleteDialog);

  const { mutate: deleteRole, isPending } = useDeleteRole();

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data } = useRoles();

  const table = useReactTable({
    data: data ?? fallbackData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    deleteRole(roleId, {
      onSuccess: () => {
        toast.success("Role has been successfully deleted!");
        closeDeleteDialog();
      },
    });
  };

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} exporting={true}>
          <RolesDataTableToolbar />
        </DataTableToolbar>
      </DataTable>
      <CreateRoleDialog open={isCreateDialogOpen} onOpenChange={closeCreateDialog} />
      <DeleteDialog
        open={isDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete user."
        deleteFn={dialogDeleteFn}
        loading={isPending}
      />
    </>
  );
};

export default RolesDataTable;
