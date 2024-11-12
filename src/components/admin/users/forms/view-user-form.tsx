import ErrorAlert from "@/components/common/error-alert";
import FormSkeleton from "@/components/common/form-skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useUserById } from "@/hooks/queries/user-queries";
import { useUserStore } from "@/stores/user-store";
import React from "react";

const ViewUserForm = () => {
  const userId = useUserStore((state) => state.userId);

  const { isPending, isError, data } = useUserById(userId);

  const userRolesOptions = React.useMemo(() => {
    return data?.roles.map<Option>((role) => ({
      value: role.id,
      label: role.name,
      disable: false,
    }));
  }, [data]);

  if (isPending) {
    return <FormSkeleton count={5} />;
  }

  if (isError) {
    return (
      <ErrorAlert
        title="User Data Unavailable"
        description="Unable to load user details. Please refresh or try again."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Username</Label>
        <Input placeholder="Username" value={data.username} readOnly={true} />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input placeholder="Email" value={data.email} readOnly={true} />
      </div>
      <div className="space-y-2">
        <Label>First name</Label>
        <Input placeholder="First name" value={data.firstName} readOnly={true} />
      </div>
      <div className="space-y-2">
        <Label>Last name</Label>
        <Input placeholder="Last name" value={data.lastName} readOnly={true} />
      </div>
      <div className="space-y-2">
        <Label>Roles</Label>
        <MultipleSelector
          value={userRolesOptions}
          placeholder="No roles assigned"
          emptyIndicator={<span>Brak</span>}
          disabled={true}
          hidePlaceholderWhenSelected
        />
      </div>
    </div>
  );
};

export default ViewUserForm;
