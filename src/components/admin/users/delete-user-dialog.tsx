import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUser } from "@/hooks/mutations/user-mutations";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner";

const DeleteUserDialog = ({ ...props }: React.ComponentPropsWithoutRef<typeof Dialog>) => {
  const userId = useUserStore((state) => state.userId);
  const closeDialog = useUserStore((state) => state.closeDialog);

  const { mutate: deleteUser, isPending, isSuccess } = useDeleteUser();

  const onSubmit = () => {
    deleteUser(userId);

    if (isSuccess) {
      toast.success("User has been successfully deleted!");
      closeDialog();
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete user.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => onSubmit()} loading={isPending}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
