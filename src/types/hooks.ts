import type { Alert, Game, Status, User, UserLogin, UserLoginWithoutUsername } from "@/types/app";

export interface UseAuthStore {
  images: string[];
  isLoadingImages: boolean;
  isChecking: boolean;
  status: Status;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
  handleLogOut: () => void;
  handleLogin: (user: User) => void;
  handleLoginWithEmailAndPassword: (user: UserLoginWithoutUsername) => void;
  handleLoginWithGoogle: () => void;
  handleCreateNewUserWithEmailAndPassword: (user: UserLogin) => void;
  handleGetImages: () => void;
}

export interface UseCheckAuth {
  status: Status;
}

export interface UseForm<T> {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
}

export interface UseGameStore {
  games: Game[];
  isLoadingGames: boolean;
  categories: string[];
  isLoadingCategories: boolean;
  favoritesGames: Game[];
  isLoadingFavoritesGames: boolean;
  activeGame: Game | null;
  handleGetGames: () => void;
  handleGetFavoriteGames: () => void;
  handleSetNewGameToFavorite: (game: Game) => void;
  handleSetToInitialState: () => void;
  handleSetActiveGame: (game: Game) => void;
  handleClearActiveGame: () => void;
  handleDeleteFavoriteGame: (game: Game) => void;
  handleGetGamesByCategory: (category: string) => void;
}

export interface UseSlide {
  index: number;
  handleSetIndex: (index: number) => void;
}

export interface UseUiStore {
  alert: Alert;
  isNavBarOpen: boolean;
  isFilterCategoriesOpen: boolean;
  handleOpenNavBar: () => void;
  handleCloseNavBar: () => void;
  handleOpenFilterCategories: () => void;
  handleCloseFilterCategories: () => void;
  handleOpenAlert: (alert: Alert) => void;
  handleCloseAlert: () => void;
}
