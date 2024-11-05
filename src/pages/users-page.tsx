import { Separator } from "@/components/ui/separator";
import UsersIcon from "@/assets/users.svg";
import { rootStore } from "@/stores/root-store";
import { useEffect } from "react";
import UsersDataTable from "@/components/admin/users/users-data-table";

const UsersPage = () => {
  const { usersStore } = rootStore;

  useEffect(() => {
    usersStore.getAllUsers();
  }, [usersStore]);

  return (
    <div>
      <div className="flex flex-row space-x-6">
        <img src={UsersIcon} alt="" className="w-14 h-14" />
        <div className="space-y-0.5">
          <h1 className="font-bold tracking-tight text-3xl">Manage users</h1>
          <p className="text-muted-foreground">Control user access and permissions</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <UsersDataTable />
      </div>
    </div>
  );
};

export default UsersPage;
