import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductionLine } from "@/hooks/mutations/production-line-mutations";
import { CreateProductionLineRequest } from "@/models/production-line-models";
import { useCanvasStore } from "@/stores/canvas-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createProductionLineSchema = z.object({
  name: z.string().min(1, {
    message: "Production line name is required",
  }),
  description: z.string().optional(),
});

type CreateProductionLineFormData = z.infer<typeof createProductionLineSchema>;

const CreateProductionLineForm = () => {
  const setSelectedProductionLine = useCanvasStore((state) => state.setSelectedProductionLine);
  const closeGettingStartedDialog = useCanvasStore((state) => state.closeGettingStartedDialog);

  const createProductionLineMutation = useCreateProductionLine();

  const form = useForm({
    resolver: zodResolver(createProductionLineSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (formData: CreateProductionLineFormData) => {
    const request: CreateProductionLineRequest = {
      name: formData.name,
      description: formData.description,
      canvasData: {},
    };

    createProductionLineMutation.mutate(request, {
      onSuccess: (productionLine) => {
        toast.success("Successfully added new production line.");
        setSelectedProductionLine(productionLine);
        closeGettingStartedDialog();
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
                  placeholder="Provide a brief overview of this production line's purpose and responsibilities."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:space-x-0">
          <Button variant="outline" onClick={() => closeGettingStartedDialog()}>
            Cancel
          </Button>
          <Button type="submit" loading={createProductionLineMutation.isPending}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductionLineForm;
