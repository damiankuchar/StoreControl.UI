import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreatePermission } from "@/hooks/mutations/permission-mutations";
import { CreatePermissionRequest } from "@/models/permission-models";
import { usePermissionStore } from "@/stores/permission-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createPermissionSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string(),
});

type CreatePermissionFormData = z.infer<typeof createPermissionSchema>;

const CreatePermissionForm = () => {
  const closeSheet = usePermissionStore((state) => state.closeSheet);

  const { mutate: createPermission, isPending: isCreatePermissionPending } = useCreatePermission();

  const form = useForm<CreatePermissionFormData>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (formData: CreatePermissionFormData) => {
    const request: CreatePermissionRequest = {
      name: formData.name,
      description: formData.description,
    };

    createPermission(request, {
      onSuccess: () => {
        toast.success("Permission has been successfully created!");
        closeSheet();
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
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" loading={isCreatePermissionPending}>
          Create permission
        </Button>
      </form>
    </Form>
  );
};

export default CreatePermissionForm;
