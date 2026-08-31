import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
