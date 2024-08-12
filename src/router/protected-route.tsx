import AccessDeniedPage from "@/pages/access-denied-page";
import { rootStore } from "@/stores/root-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  permission: string;
}

const ProtectedRoute = ({ permission }: ProtectedRouteProps) => {
  const location = useLocation();
  const { authStore } = rootStore;

  if (!authStore.userData || !authStore.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authStore.userData.permissions.includes(permission)) {
    return <AccessDeniedPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
