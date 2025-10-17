import { Navigate, Outlet } from "react-router-dom";

import { useCheckAuth } from "@src/hooks/useCheckAuth";

export const AuthRoute = (): JSX.Element => {
  const { status } = useCheckAuth();

  return status !== "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/games/home" replace />
  );
};
