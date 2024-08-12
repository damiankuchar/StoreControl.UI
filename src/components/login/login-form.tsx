import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/stores/root-store";

const loginFormSchema = z.object({
  login: z.string().min(1, {
    message: "Login is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm = observer(() => {
  const navigate = useNavigate();
  const { authStore } = rootStore;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (loginFormData: LoginFormData) => {
    await authStore.login(loginFormData);
    navigate("");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Login" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto inline-block text-sm hover:underline underline-offset-2"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" loading={authStore.loading}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
});

export default LoginForm;
