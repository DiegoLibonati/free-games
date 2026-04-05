import { Fragment, useEffect } from "react";

import type { JSX } from "react";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import CardFavoriteGame from "@/components/CardFavoriteGame/CardFavoriteGame";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/pages/FavoritePage/FavoritePage.css";

const FavoritePage = (): JSX.Element => {
  const {
    favoritesGames,
    isLoadingFavoritesGames,
    handleGetFavoriteGames,
    handleSetToInitialState,
  } = useGamesStore();

  const onInit = (): void => {
    handleGetFavoriteGames();
  };

  const onDestroy = (): void => {
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return (): void => {
      onDestroy();
    };
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
                  id={favoriteGame.id}
                  thumbnail={favoriteGame.thumbnail}
                  title={favoriteGame.title}
                ></CardFavoriteGame>
              );
            })}
          </section>
        ) : (
          <section className="favorite-games__empty">
            <h1 className="favorite-games__empty-label">Add a game to your favorites list</h1>
          </section>
        )}
      </main>

      <Footer></Footer>
    </Fragment>
  );
};

export default FavoritePage;
