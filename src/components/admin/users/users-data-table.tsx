import DeleteDialog from "@/components/common/delete-dialog";
import DataTable from "@/components/ui/data-table/data-table";
import { useDeleteUser } from "@/hooks/mutations/user-mutations";
import { useUsers } from "@/hooks/queries/user-queries";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner";
import { columns } from "./columns";
import UsersDataTableToolbar from "./users-data-table-toolbar";
import UsersSheet from "./users-sheet";

const UsersDataTable = () => {
  const isSheetOpen = useUserStore((state) => state.isSheetOpen);
  const isDialogOpen = useUserStore((state) => state.isDialogOpen);
  const userId = useUserStore((state) => state.userId);
  const closeSheet = useUserStore((state) => state.closeSheet);
  const closeDialog = useUserStore((state) => state.closeDialog);

  const usersQuery = useUsers();
  const deleteUserMutation = useDeleteUser();

  const dialogDeleteFn = () => {
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        toast.success("User has been successfully deleted!");
        closeDialog();
      },
    });
  };

  return (
    <>
      <DataTable columns={columns} data={usersQuery.data ?? []}>
        <UsersDataTableToolbar />
      </DataTable>
      <UsersSheet open={isSheetOpen} onOpenChange={closeSheet} />
      <DeleteDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete user."
        deleteFn={dialogDeleteFn}
        loading={deleteUserMutation.isPending}
      />
    </>
  );
};

export default UsersDataTable;
