import { store } from "@src/store/store";

export type UpcomingGames = {
  img: string;
  name: string;
  release_date: string;
};

export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  idFirebase?: string;
};

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

export type Alert = {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
};

export type AlertType = "error" | "success" | "";

export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

export type UserLogin = { email: string; password: string; username: string };
export type UserLoginWithoutUsername = Omit<UserLogin, "username">;

export type ErrorMessage = string;
export type Status = "authenticated" | "not-authenticated" | "checking";

export type Carousel<T> = {
  name: string;
  arr: T[];
  isLoading: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Config = {
  xRapid: {
    apiKey: string;
    apiHost: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
};

// Firebase
type FirebaseOkTrue = {
  ok: true;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

type FirebaseOkFalse = {
  ok: false;
  errorCode: string;
  errorMessage: string;
};

export type SignInWithGoogle = FirebaseOkTrue | FirebaseOkFalse;
export type RegisterUserWithEmail = FirebaseOkTrue | FirebaseOkFalse;
export type LoginWithEmailPassword = FirebaseOkTrue | FirebaseOkFalse;

// Interfaces
export interface GeneralProps {
  children?: React.ReactNode;
  className?: string;
}
