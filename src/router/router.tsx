import NotFoundPage from "@/pages/not-found-page";
import { Route, Routes } from "react-router-dom";
import UnauthRoute from "./unauth-route";
import ProtectedRoute from "./protected-route";
import LoginPage from "@/pages/login-page";

const Router = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<div>Home</div>} />

      {/* Unauthenticated route with automatic redirect after log in */}
      <Route element={<UnauthRoute navigateTo="/" />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<div>Register</div>} />
      </Route>

      {/* Protected routes with permission */}
      <Route element={<ProtectedRoute permission="protected" />}>
        <Route path="protected" element={<div>Protected</div>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
