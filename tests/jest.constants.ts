import { Config, Game } from "../src/entities/entities";

export const mockConfig: Config = {
  xRapid: {
    apiKey: "YOUR API KEY XRAPID [OPTIONAL]",
    apiHost: "YOUR API HOST XRAPID [OPTIONAL]",
  },
  firebase: {
    apiKey: "YOUR API KEY FIREBASE [OPTIONAL]",
    authDomain: "YOUR AUTH DOMAIN FIREBASE [OPTIONAL]",
    projectId: "YOUR PROJECT ID FIREBASE [OPTIONAL]",
    storageBucket: "YOUR STORAGE BUCKET FIREBASE [OPTIONAL]",
    messagingSenderId: "YOUR MESSAGING SENDER ID FIREBASE [OPTIONAL]",
    appId: "YOUR APP ID FIREBASE [OPTIONAL]",
  },
};

export const mockImages: string[] = [
  "https://www.freetogame.com/g/582/thumbnail.jpg",
  "https://www.freetogame.com/g/522/thumbnail.jpg",
  "https://www.freetogame.com/g/449/thumbnail.jpg",
];

export const mockSlideImagesAuth: Record<string, string> = {
  "0": "The best free games wiki",
  "1": "Share with your friends",
  "2": "Stay up to date with the latest news",
};

export const mockAssetsImage: string = "test-image";

export const mockRequestGames: Game[] = [
  {
    id: 582,
    title: "Tarisland",
    thumbnail: "https://www.freetogame.com/g/582/thumbnail.jpg",
    short_description:
      "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
    game_url: "https://www.freetogame.com/open/tarisland",
    genre: "MMORPG",
    platform: "PC (Windows)",
    publisher: "Tencent",
    developer: "Level Infinite",
    release_date: "2024-06-22",
    freetogame_profile_url: "https://www.freetogame.com/tarisland",
  },
  {
    id: 340,
    title: "Game Of Thrones Winter Is Coming",
    thumbnail: "https://www.freetogame.com/g/340/thumbnail.jpg",
    short_description:
      "A free-to-play browser-based RTS based on the George R.R. Martin novels and popular HBO series.",
    game_url:
      "https://www.freetogame.com/open/game-of-thrones-winter-is-coming",
    genre: "Strategy",
    platform: "Web Browser",
    publisher: "GTArcade",
    developer: "YOOZOO Games ",
    release_date: "2019-11-14",
    freetogame_profile_url:
      "https://www.freetogame.com/game-of-thrones-winter-is-coming",
  },
];