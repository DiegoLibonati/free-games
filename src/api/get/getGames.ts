import { GetGamesResponse } from "@src/entities/responses";

import { gamesApi } from "@src/api/games";

export const getGames = async (): Promise<GetGamesResponse> => {
  try {
    const response = await gamesApi.get("/games", {
      method: "GET",
      params: { id: "452" },
    });

    const data: GetGamesResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching games ", e);
    throw Error(`Error fetching games: ${e}`);
  }
};
