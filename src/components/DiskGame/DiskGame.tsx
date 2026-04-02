import { useState } from "react";

import { DiskGameProps } from "@/types/props";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/components/DiskGame/DiskGame.css";

const DiskGame = ({
  id,
  developer,
  freetogame_profile_url,
  genre,
  platform,
  publisher,
  release_date,
  short_description,
  title,
  thumbnail,
}: DiskGameProps) => {
  const [isInformationOpen, setIsInformationOpen] = useState<boolean>(false);

  const { games, handleSetNewGameToFavorite } = useGamesStore();

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

  const handleSaveGameToFavorite = (id: number) => {
    const game = games.find((game) => game.id === id)!;
    handleSetNewGameToFavorite(game);
  };

  return (
    <div className={`disk-game`} style={{ animationName: isInformationOpen ? "nospin" : "spin" }}>
      <div
        className={`disk-game__img ${isInformationOpen && "disk-game__img--open"}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div
          className="disk-game__img-circle"
          style={isInformationOpen ? { display: "none" } : { display: "block" }}
        ></div>
      </div>
      <div
        className={`disk-game__information ${isInformationOpen && "disk-game__information--open"}`}
      >
        <h2 className="disk-game__title">{title}</h2>
        <p className="disk-game__description">{short_description}</p>
        <h3 className="disk-game__genre">
          Gender: <span className="disk-game__genre-span">{genre}</span>
        </h3>
        <h3 className="disk-game__platform">
          Platform: <span className="disk-game__platform-span">{platform}</span>
        </h3>
        <h3 className="disk-game__published-by">
          Published by: <span className="disk-game__published-by-span">{publisher}</span>
        </h3>
        <h3 className="disk-game__developed-by">
          Developed by: <span className="disk-game__developed-by-span">{developer}</span>
        </h3>
        <h3 className="disk-game__release-date">
          Release date: <span className="disk-game__release-date-span">{release_date}</span>
        </h3>

        <div className="disk-game__links">
          <a
            href={freetogame_profile_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit official website of ${title}`}
            className="disk-game__link-official-website"
          >
            Official website
          </a>

          <button
            type="button"
            onClick={() => handleSaveGameToFavorite(id)}
            aria-label={`Add ${title} to favorites`}
            className="disk-game__btn-favorite"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiskGame;
