import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../components/loading";

export function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
