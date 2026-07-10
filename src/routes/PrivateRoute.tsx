import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../components/loading";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
