import { Fragment, useMemo } from "react";

import { Game } from "@/types/app";

import Loader from "@/components/Loader/Loader";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/components/HomeCard/HomeCard.css";

const HomeCard = () => {
  const { games, handleSetNewGameToFavorite } = useGamesStore();

  const game = useMemo(() => {
    return games[Math.floor(Math.random() * games.length)];
  }, [games]);

  const handleSaveGameToFavorite = (game: Game): void => {
    handleSetNewGameToFavorite(game);
  };

  return (
    <article className={!game ? "home-card home-card--effect-load" : "home-card"}>
      {!game ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <img className="home-card__img" src={game.thumbnail} alt={game.title}></img>
          <div className="home-card__information">
            <h2 className="home-card__title">{game.title}</h2>
            <h3 className="home-card__genre">{game.genre}</h3>
            <h4 className="home-card__publisher">{game.publisher}</h4>

            <button
              type="button"
              aria-label="add to favorite"
              className="home-card__btn-favorite"
              onClick={() => handleSaveGameToFavorite(game)}
            >
              Add to favorite
            </button>
          </div>
        </Fragment>
      )}
    </article>
  );
};

export default HomeCard;
