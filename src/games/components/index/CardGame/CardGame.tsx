import { useState } from "react";

import { Game } from "@src/entities/entities";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/games/components/index/CardGame/CardGame.css";

interface CardGameProps {
  game: Game;
}

export const CardGame = ({ game }: CardGameProps): JSX.Element => {
  const [isInformationOpen, setIsInformationOpen] = useState<boolean>(false);

  const { handleSetNewGameToFavorite } = useGamesStore();

  const handleClick = () => {
    setIsInformationOpen(true);
  };

  const handleDoubleClick = () => {
    setIsInformationOpen(false);
  };

  const handleTouchEnd = () => {
    setIsInformationOpen(false);
  };

  const handleTouchCancel = () => {
    setIsInformationOpen(false);
  };

  const handleSaveGameToFavorite = (game: Game) => {
    handleSetNewGameToFavorite(game);
  };

  return (
    <div
      className={`index-page-card`}
      style={{ animationName: isInformationOpen ? "nospin" : "spin" }}
    >
      <div
        className={`index-page-card__img ${
          isInformationOpen && "index-page-card__img--open"
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        style={{ backgroundImage: `url(${game.thumbnail})` }}
      >
        <div
          className="index-page-card__img-circle"
          style={isInformationOpen ? { display: "none" } : { display: "block" }}
        ></div>
      </div>
      <div
        className={`index-page-card__information ${
          isInformationOpen && "index-page-card__information--open"
        }`}
      >
        <h2 className="index-page-card__title">{game.title}</h2>
        <p className="index-page-card__description">{game.short_description}</p>
        <h3 className="index-page-card__genre">
          Gender:{" "}
          <span className="index-page-card__genre-span">{game.genre}</span>
        </h3>
        <h3 className="index-page-card__platform">
          Platform:{" "}
          <span className="index-page-card__platform-span">
            {game.platform}
          </span>
        </h3>
        <h3 className="index-page-card__published-by">
          Published by:{" "}
          <span className="index-page-card__published-by-span">
            {game.publisher}
          </span>
        </h3>
        <h3 className="index-page-card__developed-by">
          Developed by:{" "}
          <span className="index-page-card__developed-by-span">
            {game.developer}
          </span>
        </h3>
        <h3 className="index-page-card__release-date">
          Release date:{" "}
          <span className="index-page-card__release-date-span">
            {game.release_date}
          </span>
        </h3>

        <div className="index-page-card__links">
          <a
            href={game.freetogame_profile_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`go to official website ${game.title}`}
            className="index-page-card__link-official-website"
          >
            Official website
          </a>

          <button
            type="button"
            onClick={() => handleSaveGameToFavorite(game)}
            aria-label={`add to favorites ${game.title}`}
            className="index-page-card__btn-favorite"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};
