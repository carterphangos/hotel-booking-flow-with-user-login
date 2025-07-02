import { useAuth } from "../contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired() {
  const { user, token } = useAuth();
  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
