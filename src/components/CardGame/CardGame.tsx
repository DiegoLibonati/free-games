import { CardGameProps } from "@/types/props";

import { useGamesStore } from "@/hooks/useGamesStore";

import { gamesService } from "@/services/gamesService";

import "@/components/CardGame/CardGame.css";

const CardGame = ({ id, thumbnail, title }: CardGameProps) => {
  const { handleSetActiveGame } = useGamesStore();

  const showActiveGame = async (id: number) => {
    const game = (await gamesService.getAll()).find((game) => game.id === id)!;

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
