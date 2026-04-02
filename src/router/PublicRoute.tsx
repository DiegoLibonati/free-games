import { Navigate, Outlet } from "react-router-dom";

import { useCheckAuth } from "@/hooks/useCheckAuth";

export const PublicRoute = () => {
  const { status } = useCheckAuth();

  return status !== "authenticated" ? <Outlet /> : <Navigate to="/home" replace />;
};
