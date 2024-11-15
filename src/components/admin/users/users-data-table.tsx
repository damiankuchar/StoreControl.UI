import DataTable from "@/components/ui/data-table/data-table";
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
import DataTableToolbar from "@/components/ui/data-table/data-table-toolbar";
import UsersDataTableToolbar from "./users-data-table-toolbar";
import UsersSheet from "./users-sheet";
import { UserDto } from "@/models/user-models";
import { useUsers } from "@/hooks/queries/user-queries";
import { useUserStore } from "@/stores/user-store";
import DeleteDialog from "@/components/common/delete-dialog";
import { useDeleteUser } from "@/hooks/mutations/user-mutations";
import { toast } from "sonner";

const fallbackData: UserDto[] = [];

const UsersDataTable = () => {
  const isSheetOpen = useUserStore((state) => state.isSheetOpen);
  const isDialogOpen = useUserStore((state) => state.isDialogOpen);
  const userId = useUserStore((state) => state.userId);
  const closeSheet = useUserStore((state) => state.closeSheet);
  const closeDialog = useUserStore((state) => state.closeDialog);

  const { mutate: deleteUser, isPending } = useDeleteUser();

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data } = useUsers();

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
    deleteUser(userId, {
      onSuccess: () => {
        toast.success("User has been successfully deleted!");
        closeDialog();
      },
    });
  };

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} exporting={true}>
          <UsersDataTableToolbar />
        </DataTableToolbar>
      </DataTable>
      <UsersSheet open={isSheetOpen} onOpenChange={closeSheet} />
      <DeleteDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete user."
        deleteFn={dialogDeleteFn}
        loading={isPending}
      />
    </>
  );
};

export default UsersDataTable;
