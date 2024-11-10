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
import DeleteUserDialog from "./delete-user-dialog";
import { UserDto } from "@/models/user-models";
import { useUsers } from "@/hooks/queries/user-queries";
import { useUserStore } from "@/stores/user-store";

const fallbackData: UserDto[] = [];

const UsersDataTable = () => {
  const isSheetOpen = useUserStore((state) => state.isSheetOpen);
  const isDialogOpen = useUserStore((state) => state.isDialogOpen);
  const closeSheet = useUserStore((state) => state.closeSheet);
  const closeDialog = useUserStore((state) => state.closeDialog);

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
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} exporting={true}>
          <UsersDataTableToolbar />
        </DataTableToolbar>
      </DataTable>
      <UsersSheet open={isSheetOpen} onOpenChange={closeSheet} />
      <DeleteUserDialog open={isDialogOpen} onOpenChange={closeDialog} />
    </>
  );
};

export default UsersDataTable;
