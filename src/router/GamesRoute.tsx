import { Fragment } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { IoMdRocket } from "react-icons/io";

import { ActiveGame } from "@src/components/ActiveGame/ActiveGame";

import { useGamesStore } from "@src/hooks/useGamesStore";
import { useCheckAuth } from "@src/hooks/useCheckAuth";

export const GamesRoute = (): JSX.Element => {
  const { status } = useCheckAuth();
  const { activeGame } = useGamesStore();

  return status === "authenticated" ? (
    <Fragment>
      <Outlet />

      <IoMdRocket
        className="rocket-top"
        onClick={() => window.scrollTo(0, 0)}
      ></IoMdRocket>

      {activeGame && <ActiveGame></ActiveGame>}
    </Fragment>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
