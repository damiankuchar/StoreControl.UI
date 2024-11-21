import DeleteDialog from "@/components/common/delete-dialog";
import DataTable from "@/components/ui/data-table/data-table";
import { useDeletePermission } from "@/hooks/mutations/permission-mutations";
import { usePermissions } from "@/hooks/queries/permission-queries";
import { useRoleById } from "@/hooks/queries/role-queries";
import { UpdateRoleRequest } from "@/models/role-models";
import { usePermissionStore } from "@/stores/permission-store";
import { RowSelectionState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { columns } from "./columns";
import PermissionDataTableToolbar from "./permissions-data-table-toolbar";
import PermissionSheet from "./permissions-sheet";
import { useUpdateRole } from "@/hooks/mutations/role-mutations";
import ErrorAlert from "@/components/common/error-alert";

interface PermissionsDataTableProps {
  roleName: string;
  roleDescription: string;
}

const PermissionsDataTable = ({ roleName, roleDescription }: PermissionsDataTableProps) => {
  const [permissionId, isSheetOpen, isDeleteDialogOpen, closeSheet, closeDeleteDialog] = usePermissionStore(
    useShallow((state) => [
      state.permissionId,
      state.isSheetOpen,
      state.isDeleteDialogOpen,
      state.closeSheet,
      state.closeDeleteDialog,
    ]),
  );

  const [initRowSelectionState, setInitRowSelectionState] = useState<RowSelectionState>({});
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});

  const { roleId } = useParams();
  const { data: role, isError: isGetRoleError } = useRoleById(roleId ?? "");

  const { data: permissions, isError: isGetPermissionsError } = usePermissions();

  const { mutate: updateRole, isPending: isUpdateRolePending } = useUpdateRole();
  const { mutate: deletePermission, isPending: isDeletePermissionPending } = useDeletePermission();

  useEffect(() => {
    if (role) {
      const initialSelection = role?.permissions
        .map((permission) => permission.id)
        .reduce((dict, item) => {
          dict[item] = true;
          return dict;
        }, {} as RowSelectionState);

      setInitRowSelectionState(initialSelection);
      setRowSelectionState(initialSelection);
    }
  }, [role]);

  const dialogDeleteFn = () => {
    deletePermission(permissionId, {
      onSuccess: () => {
        toast.success("Permission has been successfully deleted!");
        closeDeleteDialog();
      },
    });
  };

  const saveChangesFn = () => {
    if (!role) {
      toast.error("Can not update role! Role is not defined.");
      return;
    }

    const request: UpdateRoleRequest = {
      name: roleName,
      description: roleDescription,
      permissionIds: Object.keys(rowSelectionState),
    };

    updateRole(
      { id: role.id, data: request },
      {
        onSuccess: () => {
          toast.success("Role updated successfully!");
        },
      },
    );
  };

  if (isGetPermissionsError || isGetRoleError) {
    return (
      <ErrorAlert
        title="Permission Table Unavailable"
        description="Unable to load permission table. Please refresh or try again."
      />
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={permissions ?? []}
        pagination={true}
        rowSelectionState={rowSelectionState}
        onRowSelectionChange={setRowSelectionState}
      >
        <PermissionDataTableToolbar
          isLoading={isUpdateRolePending}
          saveChangesFn={() => saveChangesFn()}
          resetSelectionFn={() => setRowSelectionState(initRowSelectionState)}
        />
      </DataTable>
      <PermissionSheet open={isSheetOpen} onOpenChange={closeSheet} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete permission."
        deleteFn={dialogDeleteFn}
        loading={isDeletePermissionPending}
      />
    </>
  );
};

export default PermissionsDataTable;
