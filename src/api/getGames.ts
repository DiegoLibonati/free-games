import { Game } from "@src/entities/entities";

import { gamesApi } from "@src/api/gamesApi";

export const getGames = async (): Promise<Game[]> => {
  const response = await gamesApi.get("/games", {
    method: "GET",
    params: { id: "452" },
  });

  const data: Game[] = await response.data;

  return data;
};
