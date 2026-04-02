import { Game } from "@/types/app";
import { CarouselGamesProps } from "@/types/props";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/components/CarouselGames/CarouselGames.css";

const CarouselGames = ({ name, games }: CarouselGamesProps) => {
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
            <div className={`carousel-games__item game-${game.id}`} key={game.id}>
              <img src={game.thumbnail} alt={game.title} className="carousel-games__img"></img>
              <button
                className="carousel-games__btn-favorite"
                type="button"
                aria-label={`Add ${game.title} to favorites`}
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

export default CarouselGames;
