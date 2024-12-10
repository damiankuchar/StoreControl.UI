import DeleteDialog from "@/components/common/delete-dialog";
import DataTable from "@/components/ui/data-table/data-table";
import { useDeleteRole } from "@/hooks/mutations/role-mutations";
import { useRoles } from "@/hooks/queries/role-queries";
import { RoleDto } from "@/models/role-models";
import { useRoleStore } from "@/stores/role-store";
import { toast } from "sonner";
import { columns } from "./columns";
import CreateRoleDialog from "./create-role-dialog";
import RolesDataTableToolbar from "./roles-data-table-toolbar";

const fallbackData: RoleDto[] = [];

const RolesDataTable = () => {
  const roleId = useRoleStore((state) => state.roleId);
  const isCreateDialogOpen = useRoleStore((state) => state.isCreateDialogOpen);
  const isDialogOpen = useRoleStore((state) => state.isDeleteDialogOpen);
  const closeCreateDialog = useRoleStore((state) => state.closeCreateDialog);
  const closeDeleteDialog = useRoleStore((state) => state.closeDeleteDialog);

  const deleteRoleMutation = useDeleteRole();

  const rolesQuery = useRoles();

  const dialogDeleteFn = () => {
    deleteRoleMutation.mutate(roleId, {
      onSuccess: () => {
        toast.success("Role has been successfully deleted!");
        closeDeleteDialog();
      },
    });
  };

  return (
    <>
      <DataTable data={rolesQuery.data ?? fallbackData} columns={columns}>
        <RolesDataTableToolbar />
      </DataTable>
      <CreateRoleDialog open={isCreateDialogOpen} onOpenChange={closeCreateDialog} />
      <DeleteDialog
        open={isDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete user."
        deleteFn={dialogDeleteFn}
        loading={deleteRoleMutation.isPending}
      />
    </>
  );
};

export default RolesDataTable;
