import { ComponentPropsWithoutRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import CreateProductionLineForm from "./forms/create-production-line-form";

const GettingStartedDialog = ({ ...props }: ComponentPropsWithoutRef<typeof Dialog>) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new production line</DialogTitle>
          <DialogDescription>Develop and implement a streamlined production line to enhance efficiency and output.</DialogDescription>
        </DialogHeader>
        <CreateProductionLineForm />
      </DialogContent>
    </Dialog>
  );
};

export default GettingStartedDialog;
