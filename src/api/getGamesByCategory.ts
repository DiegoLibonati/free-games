import { Game } from "@src/entities/entities";

import { gamesApi } from "@src/api/gamesApi";

export const getGamesByCategory = async (category: string): Promise<Game[]> => {
  const response = await gamesApi.get(`/games?category=${category}`, {
    method: "GET",
    params: { id: "452" },
  });

  const data: Game[] = response.data;

  return data;
};
