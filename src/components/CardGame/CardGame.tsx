import { CardGameProps } from "@/types/props";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/components/CardGame/CardGame.css";

const CardGame = ({ id, thumbnail, title }: CardGameProps) => {
  const { games, handleSetActiveGame } = useGamesStore();

  const showActiveGame = (id: number) => {
    const game = games.find((game) => game.id === id)!;

    handleSetActiveGame(game);
  };

  return (
    <article className="card-game-games" onClick={() => showActiveGame(id)}>
      <img src={thumbnail} alt={title} className="card-game-games__img"></img>

      <h2 className="card-game-games__title">{title}</h2>
    </article>
  );
};

export default CardGame;
