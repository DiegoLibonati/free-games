import { useGamesStore } from "@src/hooks/useGamesStore";

import { Game } from "@src/entities/entities";

import "@src/games/components/games/CardGame/CardGame.css";

interface CardGameProps {
  game: Game;
}

export const CardGame = ({ game }: CardGameProps): JSX.Element => {
  const { handleSetActiveGame } = useGamesStore();

  const showActiveGame = (game: Game) => {
    handleSetActiveGame(game);
  };

  return (
    <article className="card-game-games" onClick={() => showActiveGame(game)}>
      <img
        src={game.thumbnail}
        alt={game.title}
        className="card-game-games__img"
      ></img>

      <h2 className="card-game-games__title">{game.title}</h2>
    </article>
  );
};
