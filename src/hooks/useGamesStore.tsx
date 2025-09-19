import { Game } from "@src/entities/entities";

import {
  startDeletingFavoriteGame,
  startGettingFavoriteGames,
  startGettingGames,
  startGettingGamesByCategory,
  startSaveNewGameToFavorite,
} from "@src/store/games/thunks";
import {
  clearActiveGame,
  setActiveGame,
  stateToInitialValue,
} from "@src/store/games/gamesSlice";
import { useAppDispatch, useAppSelector } from "@src/constants/redux";

type UseGameStore = {
  games: Game[];
  isLoadingGames: boolean;
  categories: string[];
  isLoadingCategories: boolean;
  favoritesGames: Game[];
  isLoadingFavoritesGames: boolean;
  activeGame: Game;
  handleGetGames: () => void;
  handleGetFavoriteGames: () => void;
  handleSetNewGameToFavorite: (game: Game) => void;
  handleSetToInitialState: () => void;
  handleSetActiveGame: (game: Game) => void;
  handleClearActiveGame: () => void;
  handleDeleteFavoriteGame: (game: Game) => void;
  handleGetGamesByCategory: (category: string) => void;
};

export const useGamesStore = (): UseGameStore => {
  const { games, categories, favorites, activeGame } = useAppSelector(
    (state) => state.games
  );
  const dispatch = useAppDispatch();

  const handleGetGames = (): void => {
    dispatch(startGettingGames());
  };

  const handleGetGamesByCategory = (category: string): void => {
    dispatch(startGettingGamesByCategory(category));
  };

  const handleGetFavoriteGames = (): void => {
    dispatch(startGettingFavoriteGames());
  };

  const handleSetNewGameToFavorite = (game: Game): void => {
    dispatch(startSaveNewGameToFavorite(game));
  };

  const handleSetToInitialState = (): void => {
    dispatch(stateToInitialValue());
  };

  const handleSetActiveGame = (game: Game): void => {
    dispatch(setActiveGame(game));
  };

  const handleClearActiveGame = (): void => {
    dispatch(clearActiveGame());
  };

  const handleDeleteFavoriteGame = (game: Game): void => {
    dispatch(startDeletingFavoriteGame(game));
  };

  return {
    games: games.games,
    isLoadingGames: games.isLoading,
    categories: categories.categories,
    isLoadingCategories: categories.isLoading,
    favoritesGames: favorites.games,
    isLoadingFavoritesGames: favorites.isLoading,
    activeGame: activeGame!,
    handleGetGames: handleGetGames,
    handleGetFavoriteGames: handleGetFavoriteGames,
    handleSetNewGameToFavorite: handleSetNewGameToFavorite,
    handleSetToInitialState: handleSetToInitialState,
    handleSetActiveGame: handleSetActiveGame,
    handleClearActiveGame: handleClearActiveGame,
    handleDeleteFavoriteGame: handleDeleteFavoriteGame,
    handleGetGamesByCategory: handleGetGamesByCategory,
  };
};
