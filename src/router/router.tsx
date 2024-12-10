import NotFoundPage from "@/pages/not-found-page";
import { Route, Routes, useNavigate } from "react-router-dom";
import UnauthRoute from "./unauth-route";
import ProtectedRoute from "./protected-route";
import LoginPage from "@/pages/login-page";
import globalRouter from "./global-router";
import UsersPage from "@/pages/users-page";
import RolesPage from "@/pages/roles-page";
import RoleUpdatePage from "@/pages/role-update-page";
import { Read_All_Permissions, Read_All_Roles, Read_All_Users } from "@/lib/permissions";
import HomePage from "@/pages/home-page";
import CanvasHeader from "@/components/header/canvas-header";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  header?: React.ReactNode;
  permissions?: string[];
}

const Router = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const routes: RouteConfig[] = [
    {
      path: "/",
      element: <HomePage />,
      header: <CanvasHeader />,
      permissions: [],
    },
    {
      path: "admin/users",
      element: <UsersPage />,
      permissions: [Read_All_Users],
    },
    {
      path: "admin/roles",
      element: <RolesPage />,
      permissions: [Read_All_Roles],
    },
    {
      path: "admin/update-role/:roleId",
      element: <RoleUpdatePage />,
      permissions: [Read_All_Permissions],
    },
  ];

  return (
    <Routes>
      {/* Unauthenticated route with automatic redirect after log in */}
      <Route element={<UnauthRoute navigateTo="/" />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Protected routes with permission */}
      {routes.map((route, index) => (
        <Route key={index} element={<ProtectedRoute header={route.header} permissions={route.permissions} />}>
          <Route path={route.path} element={route.element} />
        </Route>
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
