import Layout from "@/components/common/layout";
import AccessDeniedPage from "@/pages/access-denied-page";
import { useAuthStore } from "@/stores/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  permissions?: string[];
  breadcrumbs?: string[];
}

const ProtectedRoute = ({ breadcrumbs: breadcrumbs, permissions }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = useAuthStore((state) => state.isAuth);
  const hasPermissions = useAuthStore((state) => state.hasPermissions);

  if (!isAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasPermissions(permissions)) {
    return <AccessDeniedPage />;
  }

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
