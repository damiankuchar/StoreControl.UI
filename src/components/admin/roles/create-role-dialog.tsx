import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ComponentPropsWithoutRef } from "react";
import CreateRoleForm from "./forms/create-role-form";

const CreateRoleDialog = ({ ...props }: ComponentPropsWithoutRef<typeof Dialog>) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new role</DialogTitle>
          <DialogDescription>Create a custom role which can be assigned to application members</DialogDescription>
        </DialogHeader>
        <CreateRoleForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleDialog;
