import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

interface ErrorAlertProps extends React.ComponentPropsWithoutRef<typeof Alert> {
  title: string;
  description: string;
}

const ErrorAlert = ({ title, description, className, ...props }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className={className} {...props}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
