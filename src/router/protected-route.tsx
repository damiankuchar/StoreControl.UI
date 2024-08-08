import { useStore } from "@/stores/root-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  permission: string;
}

const ProtectedRoute = ({ permission }: ProtectedRouteProps) => {
  const location = useLocation();
  const { authStore } = useStore();

  if (!authStore.userData || !authStore.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authStore.userData.permissions.includes(permission)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
