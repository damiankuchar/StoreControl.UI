import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUserStore } from "@/stores/user-store";
import CreateUserForm from "./forms/create-user-form";
import UpdateUserForm from "./forms/update-user-form";
import ViewUserForm from "./forms/view-user-form";

const formConfig = {
  create: {
    title: "Create New User",
    description: "Fill in the details to create a new user.",
    component: CreateUserForm,
  },
  update: {
    title: "Update User Information",
    description: "Edit the fields to update the user information.",
    component: UpdateUserForm,
  },
  view: {
    title: "View User Details",
    description: "View detailed information about the user.",
    component: ViewUserForm,
  },
  default: {
    title: "User Management",
    description: "Please select an action to manage user information.",
    component: () => <></>,
  },
};

const UsersSheet = ({ ...props }: React.ComponentPropsWithRef<typeof Sheet>) => {
  const formType = useUserStore((state) => state.formType);

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

export default UsersSheet;
