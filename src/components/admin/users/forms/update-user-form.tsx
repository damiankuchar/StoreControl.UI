import ErrorAlert from "@/components/common/error-alert";
import FormSkeleton from "@/components/common/form-skeleton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateUser } from "@/hooks/mutations/user-mutations";
import { useRolesOptions } from "@/hooks/queries/role-queries";
import { useUserById } from "@/hooks/queries/user-queries";
import { UpdateUserRequest } from "@/models/user-models";
import { useUserStore } from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

  const { data: userData } = useUserById(userId);
  const { isPending: isRolesOptionsPending, isError: isRolesOptionsError, data: rolesOptions } = useRolesOptions();

  const { mutate: updateUser, isPending: isUpdateUserPending } = useUpdateUser();

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      roles: userData?.roles.map((role) => ({
        value: role.id,
        label: role.name,
        disable: false,
      })),
    },
  });

  const onSubmit = async (formData: UpdateUserFormData) => {
    const request: UpdateUserRequest = {
      roleIds: formData.roles.map((role) => role.value),
    };

    updateUser({ id: userId, data: request });
  };

  if (isRolesOptionsPending) {
    return <FormSkeleton count={1} />;
  }

  if (isRolesOptionsError) {
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
                {isRolesOptionsPending ? (
                  <Skeleton className="h-9" />
                ) : (
                  <MultipleSelector
                    {...field}
                    defaultOptions={rolesOptions}
                    placeholder="Select roles..."
                    hidePlaceholderWhenSelected
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" loading={isUpdateUserPending}>
          Update user
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
