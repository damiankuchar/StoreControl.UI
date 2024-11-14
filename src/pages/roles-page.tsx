import { Separator } from "@/components/ui/separator";
import RolesIcon from "@/assets/roles.svg";
import RolesDataTable from "@/components/admin/roles/roles-data-table";

const RolesPage = () => {
  return (
    <div>
      <div className="flex flex-row space-x-6">
        <img src={RolesIcon} alt="" className="w-14 h-14" />
        <div className="space-y-0.5">
          <h1 className="font-bold tracking-tight text-3xl">Manage roles</h1>
          <p className="text-muted-foreground">Control roles and permissions</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <RolesDataTable />
      </div>
    </div>
  );
};

export default RolesPage;
