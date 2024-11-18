import NotFoundPage from "@/pages/not-found-page";
import { Route, Routes, useNavigate } from "react-router-dom";
import UnauthRoute from "./unauth-route";
import ProtectedRoute from "./protected-route";
import LoginPage from "@/pages/login-page";
import globalRouter from "./global-router";
import UsersPage from "@/pages/users-page";
import RolesPage from "@/pages/roles-page";
import RoleUpdatePage from "@/pages/role-update-page";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  permission?: string;
  breadcrumbs?: string[];
}

const Router = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const routes: RouteConfig[] = [
    {
      path: "/",
      element: <div>Home</div>,
      permission: "",
    },
    {
      path: "admin/users",
      element: <UsersPage />,
      permission: "",
      breadcrumbs: ["Home", "Users"],
    },
    {
      path: "admin/roles",
      element: <RolesPage />,
      permission: "",
      breadcrumbs: ["Home", "Roles"],
    },
    {
      path: "admin/update-role/:roleId",
      element: <RoleUpdatePage />,
      permission: "",
      breadcrumbs: ["Home", "Roles", "Permission Manager"],
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
        <Route key={index} element={<ProtectedRoute permission={route.permission} breadcrumbs={route.breadcrumbs} />}>
          <Route path={route.path} element={route.element} />
        </Route>
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
