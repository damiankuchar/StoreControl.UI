import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { rootStore } from "@/stores/root-store";
import { observer } from "mobx-react-lite";
import { computed } from "mobx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Skeleton } from "@/components/ui/skeleton";

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

export type CreateUserFormData = z.infer<typeof createUserSchema>;

const RegisterUserForm = observer(() => {
  const { usersStore } = rootStore;

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: usersStore.createUserFormDefaultValues,
  });

  useEffect(() => {
    usersStore.getAllRoles();
  }, [usersStore]);

  const onSubmit = async (createUserFormData: CreateUserFormData) => {
    const isSuccessfull = await usersStore.userFormSubmit(createUserFormData);

    if (isSuccessfull) {
      await usersStore.getAllUsers();
      usersStore.closeSheet();
    }
  };

  const isRolesOptionLoading = computed(() => usersStore.roleOptions.length > 0).get();

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
                <Input
                  placeholder="Username"
                  {...field}
                  readOnly={usersStore.isFormViewMode}
                  disabled={usersStore.isFormUpdateMode}
                />
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
                <Input
                  placeholder="Email"
                  {...field}
                  readOnly={usersStore.isFormViewMode}
                  disabled={usersStore.isFormUpdateMode}
                />
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
                <Input
                  placeholder="First name"
                  {...field}
                  readOnly={usersStore.isFormViewMode}
                  disabled={usersStore.isFormUpdateMode}
                />
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
                <Input
                  placeholder="Last name"
                  {...field}
                  readOnly={usersStore.isFormViewMode}
                  disabled={usersStore.isFormUpdateMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {usersStore.isFormViewMode || usersStore.isFormUpdateMode ? null : (
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
        )}
        {usersStore.isFormViewMode || usersStore.isFormUpdateMode ? null : (
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
        )}
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                {isRolesOptionLoading ? (
                  <MultipleSelector
                    {...field}
                    defaultOptions={usersStore.roleOptions}
                    placeholder="Select roles..."
                    hidePlaceholderWhenSelected
                    disabled={usersStore.isFormViewMode}
                  />
                ) : (
                  <Skeleton className="h-9" />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        {usersStore.isFormViewMode ? (
          <Button type="button" size="sm" onClick={() => usersStore.closeSheet()}>
            {usersStore.buttonText}
          </Button>
        ) : (
          <Button type="submit" size="sm" loading={usersStore.loading}>
            {usersStore.buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
});

export default RegisterUserForm;
