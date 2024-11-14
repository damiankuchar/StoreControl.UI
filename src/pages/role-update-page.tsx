import PermissionsDataTable from "@/components/admin/permissions/permissions-data-table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useRoleById } from "@/hooks/queries/role-queries";
import { Link, useParams } from "react-router-dom";

const RoleUpdatePage = () => {
  const { roleId } = useParams();
  const { data: role, isPending, isError } = useRoleById(roleId ?? "");

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
          <h1 className="font-bold tracking-tight text-3xl">{role.name}</h1>
          <p className="text-muted-foreground">Control roles and permissions</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <PermissionsDataTable />
      </div>
    </div>
  );
};

export default RoleUpdatePage;
