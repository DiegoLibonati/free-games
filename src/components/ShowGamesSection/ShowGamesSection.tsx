import { useMemo } from "react";

import { DiskGame } from "@src/components/DiskGame/DiskGame";

import { useGamesStore } from "@src/hooks/useGamesStore";

import { getSliceArraySorted } from "@src/helpers/getSliceArraySorted";

import "@src/components/ShowGamesSection/ShowGamesSection.css";

export const ShowGamesSection = (): JSX.Element => {
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
          <DiskGame key={game.id} game={game}></DiskGame>
        ))}
      </article>
    </section>
  );
};
