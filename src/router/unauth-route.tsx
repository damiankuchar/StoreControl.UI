import { useAuthStore } from "@/stores/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface UnauthRouteProps {
  navigateTo: string;
}

const UnauthRoute = ({ navigateTo }: UnauthRouteProps) => {
  const location = useLocation();
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth() ? <Navigate to={navigateTo} state={{ from: location }} replace /> : <Outlet />;
};

export default UnauthRoute;
