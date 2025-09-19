import axios from "axios";

import { CONFIG } from "@src/constants/config";

export const gamesApi = axios.create({
  baseURL: "/api",
  headers: {
    "X-RapidAPI-Key": CONFIG.xRapid.apiKey,
    "X-RapidAPI-Host": CONFIG.xRapid.apiHost,
  },
});
