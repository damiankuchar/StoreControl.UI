import Layout from "@/components/common/layout";
import AccessDeniedPage from "@/pages/access-denied-page";
import { useAuthStore } from "@/stores/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  header?: React.ReactNode;
  permissions?: string[];
}

const ProtectedRoute = ({ header, permissions }: ProtectedRouteProps) => {
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
    <Layout header={header}>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
