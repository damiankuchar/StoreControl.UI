import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { usePermissionStore } from "@/stores/permission-store";
import CreatePermissionForm from "./forms/create-permission-form";
import UpdatePermissionForm from "./forms/update-permission-form";

const formConfig = {
  create: {
    title: "Create New Permission",
    description: "Fill in the details to create a new permission.",
    component: CreatePermissionForm,
  },
  update: {
    title: "Update Permission Information",
    description: "Edit the fields to update the permission information.",
    component: UpdatePermissionForm,
  },
  default: {
    title: "Permission Management",
    description: "Please select an action to manage permission information.",
    component: () => <></>,
  },
};

const PermissionSheet = ({ ...props }: React.ComponentPropsWithRef<typeof Sheet>) => {
  const formType = usePermissionStore((state) => state.formType);

  const { title, description, component: FormComponent } = formConfig[formType ?? "default"];

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md p-6 m-0 overflow-auto">
        <SheetHeader className="text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <FormComponent />
      </SheetContent>
    </Sheet>
  );
};

export default PermissionSheet;
