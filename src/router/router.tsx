import NotFoundPage from "@/pages/not-found-page";
import { Route, Routes, useNavigate } from "react-router-dom";
import UnauthRoute from "./unauth-route";
import ProtectedRoute from "./protected-route";
import LoginPage from "@/pages/login-page";
import globalRouter from "./global-router";
import UsersPage from "@/pages/users-page";

const Router = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <Routes>
      {/* Unauthenticated route with automatic redirect after log in */}
      <Route element={<UnauthRoute navigateTo="/" />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Protected routes with permission */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<div>Home</div>} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="admin/users" element={<UsersPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
