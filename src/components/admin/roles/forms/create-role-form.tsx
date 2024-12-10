import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRole } from "@/hooks/mutations/role-mutations";
import { CreateRoleRequest } from "@/models/role-models";
import { useRoleStore } from "@/stores/role-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createRoleSchema = z.object({
  name: z.string().min(1, {
    message: "Role name is required",
  }),
  description: z.string(),
  permissionIds: z.array(z.string()),
});

type CreateRoleFormData = z.infer<typeof createRoleSchema>;

const CreateRoleForm = () => {
  const closeCreateDialog = useRoleStore((state) => state.closeCreateDialog);

  const createRoleMutation = useCreateRole();

  const form = useForm({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  });

  const onSubmit = (formData: CreateRoleFormData) => {
    const request: CreateRoleRequest = {
      name: formData.name,
      description: formData.description,
      permissionIds: [],
    };

    createRoleMutation.mutate(request, {
      onSuccess: () => {
        toast.success("Role has been successfully created!");
        closeCreateDialog();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a brief overview of this role's purpose and responsibilities."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:space-x-0">
          <Button variant="outline" onClick={() => closeCreateDialog()}>
            Cancel
          </Button>
          <Button type="submit" loading={createRoleMutation.isPending}>
            Create role
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRoleForm;
