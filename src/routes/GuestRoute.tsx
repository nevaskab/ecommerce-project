import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function GuestRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
