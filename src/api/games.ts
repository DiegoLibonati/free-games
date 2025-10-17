import axios from "axios";

import envs from "@src/constants/envs";

export const gamesApi = axios.create({
  baseURL: "/api",
  headers: {
    "X-RapidAPI-Key": envs.xRapid.apiKey,
    "X-RapidAPI-Host": envs.xRapid.apiHost,
  },
});
