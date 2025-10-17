import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Game } from "@src/entities/app";
import { GamesState } from "@src/entities/states";

const initialState: GamesState = {
  games: {
    isLoading: false,
    games: [],
  },
  categories: {
    isLoading: false,
    categories: [],
  },
  favorites: {
    isLoading: false,
    games: [],
  },
  activeGame: null,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setLoadingGames: (state, action: PayloadAction<boolean>) => {
      const boolean = action.payload;

      state.games.isLoading = boolean;
    },
    setGames: (state, action: PayloadAction<Game[]>) => {
      const games = action.payload;

      state.games.games = games;
      state.games.isLoading = false;
    },
    setLoadingFavoritesGames: (state, action: PayloadAction<boolean>) => {
      const boolean = action.payload;

      state.favorites.isLoading = boolean;
    },
    setFavoritesGames: (state, action: PayloadAction<Game[]>) => {
      const games = action.payload;

      state.favorites.games = games;
      state.favorites.isLoading = false;
    },
    setCategories: (state, action: PayloadAction<Game[]>) => {
      const categories: string[] = [];
      const games = action.payload;

      games.forEach((game) => {
        if (categories.includes(game.genre)) return;
        categories.push(game.genre);
      });

      state.categories.categories = categories;
      state.categories.isLoading = false;
    },
    setActiveGame: (state, action: PayloadAction<Game>) => {
      const game = action.payload;

      state.activeGame = game;
    },
    clearActiveGame: (state) => {
      state.activeGame = null;
    },
    stateToInitialValue: (state) => {
      state = initialState;
    },
  },
});

export const {
  setLoadingGames,
  setGames,
  setCategories,
  stateToInitialValue,
  setLoadingFavoritesGames,
  setFavoritesGames,
  setActiveGame,
  clearActiveGame,
} = gamesSlice.actions;

export default gamesSlice.reducer;
