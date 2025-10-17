import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@src/features/auth/authSlice";
import gamesSlice from "@src/features/games/gamesSlice";
import uiSlice from "@src/features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    games: gamesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
