import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePermission } from "@/hooks/mutations/permission-mutations";
import { usePermissionById } from "@/hooks/queries/permission-queries";
import { UpdatePermissionRequest } from "@/models/permission-models";
import { usePermissionStore } from "@/stores/permission-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updatePermissionSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

type UpdatePermissionFormData = z.infer<typeof updatePermissionSchema>;

const UpdatePermissionForm = () => {
  const permissionId = usePermissionStore((state) => state.permissionId);
  const closeSheet = usePermissionStore((state) => state.closeSheet);

  const { data: existingPermission } = usePermissionById(permissionId);
  const { mutate: updatePermission, isPending: isUpdatePermissionPending } = useUpdatePermission();

  const form = useForm<UpdatePermissionFormData>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: {
      name: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (existingPermission) {
      reset({
        name: existingPermission.name,
      });
    }
  }, [reset, existingPermission]);

  const onSubmit = (formData: UpdatePermissionFormData) => {
    const request: UpdatePermissionRequest = {
      name: formData.name,
    };

    updatePermission(
      { id: permissionId, data: request },
      {
        onSuccess: () => {
          toast.success("Permission has been successfully updated!");
          closeSheet();
        },
      },
    );
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
        <Button type="submit" size="sm" loading={isUpdatePermissionPending}>
          Update permission
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePermissionForm;
