import type { Game } from "@/types/app";

import envs from "@/constants/envs";

export const gamesService = {
  getAll: async (): Promise<Game[]> => {
    const response = await fetch(`/api/games`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": envs.xRapid.apiKey,
        "X-RapidAPI-Host": envs.xRapid.apiHost,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const games: Game[] = (await response.json()) as Game[];

    return games;
  },
  getByCategory: async (category: string): Promise<Game[]> => {
    const response = await fetch(`/api/games?category=${category}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": envs.xRapid.apiKey,
        "X-RapidAPI-Host": envs.xRapid.apiHost,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const user: Game[] = (await response.json()) as Game[];

    return user;
  },
};
