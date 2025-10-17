import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";

import { CheckingAuth } from "@src/components/CheckingAuth/CheckingAuth";

import { LoginPage } from "@src/pages/LoginPage/LoginPage";
import { RegisterPage } from "@src/pages/RegisterPage/RegisterPage";
import { IndexPage } from "@src/pages/IndexPage/IndexPage";
import { FavoritePage } from "@src/pages/FavoritePage/FavoritePage";
import { GamesPage } from "@src/pages/GamesPage/GamesPage";

import { useCheckAuth } from "@src/hooks/useCheckAuth";
import { useUiStore } from "@src/hooks/useUiStore";

import { AuthRoute } from "@src/router/AuthRoute";
import { GamesRoute } from "@src/router/GamesRoute";

export const AppRouter = (): JSX.Element => {
  const { alert, handleCloseAlert } = useUiStore();
  const { status } = useCheckAuth();

  useEffect(() => {
    if (!alert.isOpen) return;

    Swal.fire(alert.title, alert.message, alert.type as SweetAlertIcon);
    handleCloseAlert();
  }, [alert.isOpen]);

  if (status === "checking") return <CheckingAuth></CheckingAuth>;

  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/auth/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/auth/register"
          element={<RegisterPage></RegisterPage>}
        ></Route>
      </Route>

      <Route element={<GamesRoute />}>
        <Route path="/games/home" element={<IndexPage></IndexPage>}></Route>

        <Route
          path="/games/favorite"
          element={<FavoritePage></FavoritePage>}
        ></Route>

        <Route
          path={`/games/explore`}
          element={<GamesPage></GamesPage>}
        ></Route>
      </Route>

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
