import ErrorAlert from "@/components/common/error-alert";
import FormSkeleton from "@/components/common/form-skeleton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useUpdateUser } from "@/hooks/mutations/user-mutations";
import { useRoles } from "@/hooks/queries/role-queries";
import { useUserById } from "@/hooks/queries/user-queries";
import { UpdateUserRequest } from "@/models/user-models";
import { useUserStore } from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const roleOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const updateUserSchema = z.object({
  roles: z.array(roleOptionSchema),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

const UpdateUserForm = () => {
  const userId = useUserStore((state) => state.userId);
  const closeSheet = useUserStore((state) => state.closeSheet);

  const userQuery = useUserById(userId);
  const rolesQuery = useRoles();
  const updateUserMutation = useUpdateUser();

  const rolesOptions = useMemo(() => {
    return rolesQuery.data?.map<Option>((role) => ({
      label: role.name,
      value: role.id,
      disable: false,
    }));
  }, [rolesQuery.data]);

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      roles: [],
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (userQuery.data) {
      reset({
        roles: userQuery.data.roles.map((role) => ({
          value: role.id,
          label: role.name,
          disable: false,
        })),
      });
    }
  }, [reset, userQuery.data]);

  const onSubmit = (formData: UpdateUserFormData) => {
    const request: UpdateUserRequest = {
      roleIds: formData.roles.map((role) => role.value),
    };

    updateUserMutation.mutate(
      { id: userId, data: request },
      {
        onSuccess: () => {
          toast.success("User has been successfully updated!");
          closeSheet();
        },
      },
    );
  };

  if (rolesQuery.isPending) {
    return <FormSkeleton count={1} />;
  }

  if (rolesQuery.isError) {
    return (
      <ErrorAlert
        title="Update Action Unavailable"
        description="Unable to load roles info. Please refresh or try again."
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  defaultOptions={rolesOptions}
                  placeholder="Select roles..."
                  hidePlaceholderWhenSelected
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" loading={updateUserMutation.isPending}>
          Update user
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
