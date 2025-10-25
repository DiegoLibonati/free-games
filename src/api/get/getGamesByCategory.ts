import { GetGamesByCategoryResponse } from "@src/entities/responses";

import { gamesApi } from "@src/api/games";

export const getGamesByCategory = async (
  category: string
): Promise<GetGamesByCategoryResponse> => {
  try {
    const response = await gamesApi.get(`/games?category=${category}`, {
      method: "GET",
      params: { id: "452" },
    });

    const data: GetGamesByCategoryResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching games by category ", e);
    throw Error(`Error fetching games by category: ${e}`);
  }
};
