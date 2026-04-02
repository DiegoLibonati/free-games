import { useMemo } from "react";

import DiskGame from "@/components/DiskGame/DiskGame";

import { useGamesStore } from "@/hooks/useGamesStore";

import { getSliceArraySorted } from "@/helpers/getSliceArraySorted";

import "@/components/ShowGamesSection/ShowGamesSection.css";

const ShowGamesSection = () => {
  const { games } = useGamesStore();

  const shuffledGames = useMemo(() => getSliceArraySorted(games, 12), [games]);

  return (
    <section className="show-games">
      <h2 className="show-games__title">Other Games</h2>

      <article className="line-wrapper">
        <div className="line"></div>
      </article>

      <article className="show-games__cards">
        {shuffledGames?.map((game) => (
          <DiskGame
            key={game.id}
            developer={game.developer}
            freetogame_profile_url={game.freetogame_profile_url}
            genre={game.genre}
            id={game.id}
            platform={game.platform}
            publisher={game.publisher}
            release_date={game.release_date}
            short_description={game.short_description}
            thumbnail={game.thumbnail}
            title={game.title}
          ></DiskGame>
        ))}
      </article>
    </section>
  );
};

export default ShowGamesSection;
