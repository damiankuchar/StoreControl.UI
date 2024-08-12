import { rootStore } from "@/stores/root-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface UnauthRouteProps {
  navigateTo: string;
}

const UnauthRoute = ({ navigateTo }: UnauthRouteProps) => {
  const location = useLocation();
  const { authStore } = rootStore;

  return authStore.isAuth ? <Navigate to={navigateTo} state={{ from: location }} replace /> : <Outlet />;
};

export default UnauthRoute;
