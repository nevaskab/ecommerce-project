import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
