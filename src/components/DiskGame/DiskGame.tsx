import { useState } from "react";

import { Game } from "@src/entities/app";
import { DiskGameProps } from "@src/entities/props";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/components/DiskGame/DiskGame.css";

export const DiskGame = ({ game }: DiskGameProps): JSX.Element => {
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
      className={`disk-game`}
      style={{ animationName: isInformationOpen ? "nospin" : "spin" }}
    >
      <div
        className={`disk-game__img ${
          isInformationOpen && "disk-game__img--open"
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        style={{ backgroundImage: `url(${game.thumbnail})` }}
      >
        <div
          className="disk-game__img-circle"
          style={isInformationOpen ? { display: "none" } : { display: "block" }}
        ></div>
      </div>
      <div
        className={`disk-game__information ${
          isInformationOpen && "disk-game__information--open"
        }`}
      >
        <h2 className="disk-game__title">{game.title}</h2>
        <p className="disk-game__description">{game.short_description}</p>
        <h3 className="disk-game__genre">
          Gender:{" "}
          <span className="disk-game__genre-span">{game.genre}</span>
        </h3>
        <h3 className="disk-game__platform">
          Platform:{" "}
          <span className="disk-game__platform-span">
            {game.platform}
          </span>
        </h3>
        <h3 className="disk-game__published-by">
          Published by:{" "}
          <span className="disk-game__published-by-span">
            {game.publisher}
          </span>
        </h3>
        <h3 className="disk-game__developed-by">
          Developed by:{" "}
          <span className="disk-game__developed-by-span">
            {game.developer}
          </span>
        </h3>
        <h3 className="disk-game__release-date">
          Release date:{" "}
          <span className="disk-game__release-date-span">
            {game.release_date}
          </span>
        </h3>

        <div className="disk-game__links">
          <a
            href={game.freetogame_profile_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`go to official website ${game.title}`}
            className="disk-game__link-official-website"
          >
            Official website
          </a>

          <button
            type="button"
            onClick={() => handleSaveGameToFavorite(game)}
            aria-label={`add to favorites ${game.title}`}
            className="disk-game__btn-favorite"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};
