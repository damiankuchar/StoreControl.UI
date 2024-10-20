import Layout from "@/components/common/layout";
import AccessDeniedPage from "@/pages/access-denied-page";
import { rootStore } from "@/stores/root-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  permission?: string;
}

const ProtectedRoute = ({ permission }: ProtectedRouteProps) => {
  const location = useLocation();
  const { authStore } = rootStore;

  if (!authStore.tokenData || !authStore.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (permission && !authStore.hasPermission(permission)) {
    return <AccessDeniedPage />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
