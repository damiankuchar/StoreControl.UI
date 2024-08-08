import { useStore } from "@/stores/root-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface UnauthRouteProps {
  navigateTo: string;
}

const UnauthRoute = ({ navigateTo }: UnauthRouteProps) => {
  const location = useLocation();
  const { authStore } = useStore();

  return !authStore.isAuth ? <Outlet /> : <Navigate to={navigateTo} state={{ from: location }} replace />;
};

export default UnauthRoute;
