import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@src/store/auth/authSlice";
import gamesSlice from "@src/store/games/gamesSlice";
import uiSlice from "@src/store/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    games: gamesSlice,
  },
});
