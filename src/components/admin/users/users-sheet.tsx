import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { rootStore } from "@/stores/root-store";

const UsersSheet = ({ children, ...props }: React.ComponentPropsWithRef<typeof Sheet>) => {
  const { usersStore } = rootStore;

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md p-6 m-0 overflow-auto">
        <SheetHeader className="text-left">
          <SheetTitle>{usersStore.sheetTitle}</SheetTitle>
          <SheetDescription>{usersStore.sheetDescription}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default UsersSheet;
