import LoginForm from "@/components/login/login-form";
import Logo from "@/assets/warehouse.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <img src={Logo} alt="" className="mx-auto w-16 h-16 " />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link to="/register" className="hover:underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
