import PermissionsDataTable from "@/components/admin/permissions/permissions-data-table";
import ErrorAlert from "@/components/common/error-alert";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoleById } from "@/hooks/queries/role-queries";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RoleUpdatePage = () => {
  const { roleId } = useParams();
  const { data: role, isPending, isError } = useRoleById(roleId ?? "");

  const [roleName, setRoleName] = useState("");

  if (isError)
    return (
      <ErrorAlert
        title="Role Permission Unavailable"
        description="Unable to load permissions info. Please refresh or try again."
      />
    );

  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="space-y-0.5">
          {isPending ? (
            <Skeleton className="h-9 w-48" />
          ) : (
            <Input
              className="font-bold tracking-tight text-3xl border-0 focus-visible:ring-0 border-b border-transparent hover:border-input px-0 py-0 pb-1 shadow-none rounded-none focus-visible:border-primary"
              defaultValue={role?.name}
              onChange={(e) => setRoleName(e.target.value)}
            />
          )}

          <p className="text-muted-foreground">Control roles and permissions</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <PermissionsDataTable roleName={roleName} />
      </div>
    </div>
  );
};

export default RoleUpdatePage;
