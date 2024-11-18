import PermissionsDataTable from "@/components/admin/permissions/permissions-data-table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRoleById } from "@/hooks/queries/role-queries";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const RoleUpdatePage = () => {
  const { roleId } = useParams();
  const { data: role, isPending, isError } = useRoleById(roleId ?? "");

  const [roleName, setRoleName] = useState("");

  // TODO: Handle pending/error state
  if (isPending) return <div>Pending...</div>;

  if (isError) return <div>Error...</div>;

  return (
    <div>
      <div className="flex flex-col space-y-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/admin/roles">Roles</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Manager</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-0.5">
          <Input
            className="font-bold tracking-tight text-3xl border-0 focus-visible:ring-0 border-b border-transparent px-0 py-0 shadow-none rounded-none focus-visible:border-primary"
            defaultValue={role.name}
            onChange={(e) => setRoleName(e.target.value)}
          />
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
