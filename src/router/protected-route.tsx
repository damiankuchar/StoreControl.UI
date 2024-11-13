import Layout from "@/components/common/layout";
import AccessDeniedPage from "@/pages/access-denied-page";
import { useAuthStore } from "@/stores/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  permission?: string;
}

const ProtectedRoute = ({ permission }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = useAuthStore((state) => state.isAuth);
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (!isAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <AccessDeniedPage />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
