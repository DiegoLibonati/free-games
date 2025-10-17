import { Game } from "@src/entities/app";

import { gamesApi } from "@src/api/games";

export const getGames = async (): Promise<Game[]> => {
  try {
    const response = await gamesApi.get("/games", {
      method: "GET",
      params: { id: "452" },
    });

    const data: Game[] = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching games ", e);
    throw Error(`Error fetching games: ${e}`);
  }
};
