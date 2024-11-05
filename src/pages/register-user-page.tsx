import RegisterUserForm from "@/components/admin/register-user/register-user-form";
import { Separator } from "@/components/ui/separator";

const RegisterUserPage = () => {
  return (
    <div>
      <div className="space-y-0.5">
        <h1 className="font-bold tracking-tight text-3xl">Register user</h1>
        <p className="text-muted-foreground">Create user account</p>
      </div>
      <Separator className="my-6" />
      <div className="max-w-3xl">
        <RegisterUserForm />
      </div>
    </div>
  );
};

export default RegisterUserPage;
