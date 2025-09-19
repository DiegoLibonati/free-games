import { Game } from "@src/entities/entities";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/games/components/favorite/CardFavoriteGame/CardFavoriteGame.css";

interface CardFavoriteGameProps {
  game: Game;
}

export const CardFavoriteGame = ({
  game,
}: CardFavoriteGameProps): JSX.Element => {
  const { handleSetActiveGame } = useGamesStore();

  const handleClick = (game: Game) => {
    handleSetActiveGame(game);
  };

  return (
    <article className="card-favorite-game" onClick={() => handleClick(game)}>
      <img
        src={game.thumbnail}
        alt={game.title}
        className="card-favorite-game__img"
      ></img>

      <h2 className="card-favorite-game__title">{game.title}</h2>
    </article>
  );
};
