import type { JSX } from "react";
import type { UpcomingGameProps } from "@/types/props";

import "@/components/UpcomingGame/UpcomingGame.css";

const UpcomingGame = ({ img, name, release_date }: UpcomingGameProps): JSX.Element => {
  return (
    <article className="upcoming-game">
      <img className="upcoming-game__img" src={img} alt={name}></img>

      <h2 className="upcoming-game__title">
        {name} <br></br> {release_date}
      </h2>
    </article>
  );
};

export default UpcomingGame;
