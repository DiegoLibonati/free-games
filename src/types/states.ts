import { Alert, ErrorMessage, Game, Status, User } from "@/types/app";

export type GamesState = {
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
};

export type AuthState = {
  images: { images: string[]; isLoadingImages: boolean };
  auth: { isChecking: boolean; status: Status; errorMessage: ErrorMessage };
  user: User;
};

export type UIState = {
  navBar: {
    isOpen: boolean;
  };
  filters: {
    categories: {
      isOpen: boolean;
    };
  };
  alert: Alert;
};
