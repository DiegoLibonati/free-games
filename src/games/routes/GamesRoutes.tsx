import { Fragment } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { IoMdRocket } from "react-icons/io";

import { ActiveGame } from "@src/ui/components/ActiveGame/ActiveGame";
import { IndexPage } from "@src/games/pages/IndexPage/IndexPage";
import { FavoritePage } from "@src/games/pages/FavoritePage/FavoritePage";
import { GamesPage } from "@src/games/pages/GamesPage/GamesPage";

import { useGamesStore } from "@src/hooks/useGamesStore";

export const GamesRoutes = (): JSX.Element => {
  const { activeGame } = useGamesStore();

  return (
    <Fragment>
      <Routes>
        <Route path="/games/index" element={<IndexPage></IndexPage>}></Route>

        <Route
          path="/games/favorite"
          element={<FavoritePage></FavoritePage>}
        ></Route>

        <Route path={`/games/games`} element={<GamesPage></GamesPage>}></Route>

        <Route
          path="/*"
          element={<Navigate to="/games/index"></Navigate>}
        ></Route>
      </Routes>

      <IoMdRocket
        className="rocket-top"
        onClick={() => window.scrollTo(0, 0)}
      ></IoMdRocket>

      {activeGame && <ActiveGame></ActiveGame>}
    </Fragment>
  );
};
