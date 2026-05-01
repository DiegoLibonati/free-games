import type { Game } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

import envs from "@/constants/envs";

const gameService = {
  getAll: async (): Promise<ResponseDirect<Game[]>> => {
    const response = await fetch(`/api/games`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": envs.xRapid.apiKey,
        "X-RapidAPI-Host": envs.xRapid.apiHost,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<Game[]>;
  },
  getByCategory: async (category: string): Promise<ResponseDirect<Game[]>> => {
    const response = await fetch(`/api/games?category=${category}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": envs.xRapid.apiKey,
        "X-RapidAPI-Host": envs.xRapid.apiHost,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<Game[]>;
  },
};

export default gameService;
