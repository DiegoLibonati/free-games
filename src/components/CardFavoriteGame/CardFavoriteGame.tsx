import { CardFavoriteGameProps } from "@/types/props";

import { useGamesStore } from "@/hooks/useGamesStore";

import { gamesService } from "@/services/gamesService";

import "@/components/CardFavoriteGame/CardFavoriteGame.css";

const CardFavoriteGame = ({ id, thumbnail, title }: CardFavoriteGameProps) => {
  const { handleSetActiveGame } = useGamesStore();

  const handleClick = async (id: number) => {
    const game = (await gamesService.getAll()).find((game) => game.id === id)!;

    handleSetActiveGame(game);
  };

  return (
    <article className="card-favorite-game" onClick={() => handleClick(id)}>
      <img src={thumbnail} alt={title} className="card-favorite-game__img"></img>

      <h2 className="card-favorite-game__title">{title}</h2>
    </article>
  );
};

export default CardFavoriteGame;
