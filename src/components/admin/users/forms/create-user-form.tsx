import ErrorAlert from "@/components/common/error-alert";
import FormSkeleton from "@/components/common/form-skeleton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateUser } from "@/hooks/mutations/user-mutations";
import { useRoles } from "@/hooks/queries/role-queries";
import { CreateUserRequest } from "@/models/user-models";
import { useUserStore } from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const roleOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const createUserSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username is required",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Invalid email format",
      }),
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
    roles: z.array(roleOptionSchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateUserFormData = z.infer<typeof createUserSchema>;

const CreateUserForm = () => {
  const closeSheet = useUserStore((state) => state.closeSheet);

  const rolesQuery = useRoles();
  const createUserMutation = useCreateUser();

  const rolesOptions = React.useMemo(() => {
    return rolesQuery.data?.map<Option>((role) => ({
      label: role.name,
      value: role.id,
      disable: false,
    }));
  }, [rolesQuery.data]);

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      roles: [],
    },
  });

  const onSubmit = (formData: CreateUserFormData) => {
    const request: CreateUserRequest = {
      username: formData.username,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      roleIds: formData.roles.map((role) => role.value),
    };

    createUserMutation.mutate(request, {
      onSuccess: () => {
        toast.success("User has been successfully created!");
        closeSheet();
      },
    });
  };

  if (rolesQuery.isPending) {
    return <FormSkeleton count={7} />;
  }

  if (rolesQuery.isError) {
    return (
      <ErrorAlert
        title="Create Action Unavailable"
        description="Unable to load roles info. Please refresh or try again."
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                {rolesQuery.isPending ? (
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
        <Button type="submit" size="sm" loading={createUserMutation.isPending}>
          Create user
        </Button>
      </form>
    </Form>
  );
};

export default CreateUserForm;
