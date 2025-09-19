import { Fragment, useEffect } from "react";

import { NavBar } from "@src/ui/components/NavBar/NavBar";
import { Footer } from "@src/ui/components/Footer/Footer";
import { Loader } from "@src/ui/components/Loader/Loader";
import { CardFavoriteGame } from "@src/games/components/favorite/CardFavoriteGame/CardFavoriteGame";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/games/pages/FavoritePage/FavoritePage.css";

export const FavoritePage = (): JSX.Element => {
  const {
    favoritesGames,
    isLoadingFavoritesGames,
    handleGetFavoriteGames,
    handleSetToInitialState,
  } = useGamesStore();

  const onInit = () => {
    handleGetFavoriteGames();
  };

  const onDestroy = () => {
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return () => onDestroy();
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>

      <main className="main-favorite-page">
        {isLoadingFavoritesGames ? (
          <Loader></Loader>
        ) : favoritesGames.length > 0 ? (
          <section className="favorite-games">
            {favoritesGames.map((favoriteGame) => {
              return (
                <CardFavoriteGame
                  key={`game-${favoriteGame.id}-${favoriteGame.title}`}
                  game={favoriteGame}
                ></CardFavoriteGame>
              );
            })}
          </section>
        ) : (
          <section className="favorite-games__empty">
            <h1 className="favorite-games__empty-label">
              Add a game to your favorites list
            </h1>
          </section>
        )}
      </main>

      <Footer></Footer>
    </Fragment>
  );
};
