import DataTable from "@/components/ui/data-table/data-table";
import { rootStore } from "@/stores/root-store";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { observer } from "mobx-react-lite";
import DataTableToolbar from "@/components/ui/data-table/data-table-toolbar";
import UsersDataTableToolbar from "./users-data-table-toolbar";
import UsersSheet from "./users-sheet";
import RegisterUserForm from "../register-user/register-user-form";
import DeleteUserDialog from "./delete-user-dialog";

const UsersDataTable = observer(() => {
  const { usersStore } = rootStore;

  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    usersStore.getAllUsers();
  }, [usersStore]);

  const table = useReactTable({
    data: usersStore.users,
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
      <UsersSheet open={usersStore.isSheetOpen} onOpenChange={() => usersStore.closeSheet()}>
        <RegisterUserForm />
      </UsersSheet>
      <DeleteUserDialog open={usersStore.isDeleteDialogOpen} onOpenChange={() => usersStore.closeDeleteDialog()} />
    </>
  );
});

export default UsersDataTable;
