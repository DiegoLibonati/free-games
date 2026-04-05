import type { Alert, ErrorMessage, Game, Status, User } from "@/types/app";

export interface GamesState {
  games: {
    isLoading: boolean;
    games: Game[];
  };
  categories: {
    isLoading: boolean;
    categories: string[];
  };
  favorites: {
    isLoading: boolean;
    games: Game[];
  };
  activeGame: Game | null;
}

export interface AuthState {
  images: { images: string[]; isLoadingImages: boolean };
  auth: { isChecking: boolean; status: Status; errorMessage: ErrorMessage };
  user: User;
}

export interface UIState {
  navBar: {
    isOpen: boolean;
  };
  filters: {
    categories: {
      isOpen: boolean;
    };
  };
  alert: Alert;
}
