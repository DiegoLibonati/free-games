import { Game } from "@src/entities/entities";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/games/components/index/CarouselGames/CarouselGames.css";

interface CarouselGamesProps {
  name: string;
  games: Game[];
}

export const CarouselGames = ({
  name,
  games,
}: CarouselGamesProps): JSX.Element => {
  const { handleSetNewGameToFavorite } = useGamesStore();

  const handleSetFavoriteGame = (game: Game) => {
    handleSetNewGameToFavorite(game);
  };

  return (
    <article className="carousel-games">
      <h2 className="carousel-games__name">{name}</h2>

      <div className="carousel-games__track">
        {games.map((game) => {
          return (
            <div
              className={`carousel-games__item game-${game.id}`}
              key={game.id}
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="carousel-games__img"
              ></img>
              <button
                className="carousel-games__btn-favorite"
                type="button"
                aria-label={`add game to fav ${game.title}`}
                onClick={() => handleSetFavoriteGame(game)}
              >
                Add To Fav
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};
