import { UpcomingGameProps } from "@src/entities/props";

import "@src/components/UpcomingGame/UpcomingGame.css";

export const UpcomingGame = ({
  img,
  name,
  release_date,
}: UpcomingGameProps): JSX.Element => {
  return (
    <article className="upcoming-game">
      <img className="upcoming-game__img" src={img} alt={name}></img>

      <h2 className="upcoming-game__title">
        {name} <br></br> {release_date}
      </h2>
    </article>
  );
};
