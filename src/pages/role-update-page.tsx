import PermissionsDataTable from "@/components/admin/permissions/permissions-data-table";
import ErrorAlert from "@/components/common/error-alert";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useRoleById } from "@/hooks/queries/role-queries";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoleUpdatePage = () => {
  const { roleId } = useParams();
  const rolesQuery = useRoleById(roleId ?? "");

  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  useEffect(() => {
    if (rolesQuery.data) {
      setRoleName(rolesQuery.data.name);
      setRoleDescription(rolesQuery.data.description);
    }
  }, [rolesQuery.data]);

  if (rolesQuery.isPending) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (rolesQuery.isError)
    return (
      <ErrorAlert
        title="Role Permission Unavailable"
        description="Unable to load permissions info. Please refresh or try again."
      />
    );

  const role = rolesQuery.data;

  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="space-y-0.5">
          <Input
            className="font-bold tracking-tight text-3xl border-0 focus-visible:ring-0 border-b border-transparent hover:border-input px-0 py-0 pb-1 shadow-none rounded-none focus-visible:border-primary"
            defaultValue={role.name}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Input
            className="h-6 text-muted-foreground tracking-tight text-base border-0 focus-visible:ring-0 border-b border-transparent hover:border-input px-0 py-0 pb-1 shadow-none rounded-none focus-visible:border-primary"
            defaultValue={role.description}
            onChange={(e) => setRoleDescription(e.target.value)}
          />
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <PermissionsDataTable roleName={roleName} roleDescription={roleDescription} />
      </div>
    </div>
  );
};

export default RoleUpdatePage;
