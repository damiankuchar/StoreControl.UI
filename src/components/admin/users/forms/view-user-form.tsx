import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useUserById } from "@/hooks/queries/user-queries";
import { useUserStore } from "@/stores/user-store";
import React from "react";

const ViewUserForm = () => {
  const userId = useUserStore((state) => state.userId);
  const closeSheet = useUserStore((state) => state.closeSheet);

  const { isPending, isError, data } = useUserById(userId);

  const userRolesOptions = React.useMemo(() => {
    return data?.roles.map<Option>((role) => ({
      value: role.id,
      label: role.name,
      disable: false,
    }));
  }, [data]);

  if (isPending) {
    // TODO: Render sceleton component
    return <div>Pending...</div>;
  }

  if (isError) {
    // TODO: Render error component
    return <div>Error...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Username</Label>
        <Input placeholder="Username" value={data.username} readOnly={true} />
      </div>
      <div>
        <Label>Email</Label>
        <Input placeholder="Email" value={data.email} readOnly={true} />
      </div>
      <div>
        <Label>First name</Label>
        <Input placeholder="First name" value={data.firstName} readOnly={true} />
      </div>
      <div>
        <Label>Last name</Label>
        <Input placeholder="Last name" value={data.lastName} readOnly={true} />
      </div>
      <div>
        <Label>Roles</Label>
        <MultipleSelector value={userRolesOptions} placeholder="No roles assigned" emptyIndicator={<span>Brak</span>} disabled={true} hidePlaceholderWhenSelected />
      </div>
      <Button type="submit" size="sm" onClick={() => closeSheet()}>
        Close
      </Button>
    </div>
  );
};

export default ViewUserForm;
