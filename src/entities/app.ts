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
