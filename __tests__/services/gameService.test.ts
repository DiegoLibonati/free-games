import type { Game } from "@/types/app";

import gameService from "@/services/gameService";

const mockGames: Game[] = [
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
    game_url: "https://www.freetogame.com/open/game-of-thrones-winter-is-coming",
    genre: "Strategy",
    platform: "Web Browser",
    publisher: "GTArcade",
    developer: "YOOZOO Games",
    release_date: "2019-11-14",
    freetogame_profile_url: "https://www.freetogame.com/game-of-thrones-winter-is-coming",
  },
];

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    xRapid: { apiKey: "test-key", apiHost: "test-host", apiUrl: "test-url" },
    firebase: {
      apiKey: "test",
      authDomain: "test",
      projectId: "test",
      storageBucket: "test",
      messagingSenderId: "test",
      appId: "test",
    },
  },
}));

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("gameService", () => {
  describe("getAll", () => {
    it("should return array of games on successful response", async () => {
      mockFetchSuccess(mockGames);

      const result = await gameService.getAll();

      expect(result).toEqual(mockGames);
    });

    it("should throw an error when response is not ok", async () => {
      mockFetchError(500);

      await expect(gameService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });

    it("should throw on network error", async () => {
      mockFetchNetworkError("Network error");

      await expect(gameService.getAll()).rejects.toThrow("Network error");
    });

    it("should call fetch with correct URL", async () => {
      mockFetchSuccess(mockGames);

      await gameService.getAll();

      const fetchMock = global.fetch as jest.Mock;
      expect(fetchMock).toHaveBeenCalledWith("/api/games", expect.any(Object));
    });

    it("should call fetch with correct headers", async () => {
      mockFetchSuccess(mockGames);

      await gameService.getAll();

      const fetchMock = global.fetch as jest.Mock;
      const callArgs = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = callArgs[1].headers as Record<string, string>;
      expect(headers["X-RapidAPI-Key"]).toBe("test-key");
      expect(headers["X-RapidAPI-Host"]).toBe("test-host");
    });
  });

  describe("getByCategory", () => {
    it("should return array of games for a given category", async () => {
      mockFetchSuccess(mockGames);

      const result = await gameService.getByCategory("MMORPG");

      expect(result).toEqual(mockGames);
    });

    it("should throw an error when response is not ok", async () => {
      mockFetchError(404);

      await expect(gameService.getByCategory("MMORPG")).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw on network error", async () => {
      mockFetchNetworkError("Network error");

      await expect(gameService.getByCategory("MMORPG")).rejects.toThrow("Network error");
    });

    it("should call fetch with URL including category query param", async () => {
      mockFetchSuccess(mockGames);

      await gameService.getByCategory("MMORPG");

      const fetchMock = global.fetch as jest.Mock;
      expect(fetchMock).toHaveBeenCalledWith("/api/games?category=MMORPG", expect.any(Object));
    });

    it("should call fetch with correct headers", async () => {
      mockFetchSuccess(mockGames);

      await gameService.getByCategory("MMORPG");

      const fetchMock = global.fetch as jest.Mock;
      const callArgs = fetchMock.mock.calls[0] as [string, RequestInit];
      const headers = callArgs[1].headers as Record<string, string>;
      expect(headers["X-RapidAPI-Key"]).toBe("test-key");
      expect(headers["X-RapidAPI-Host"]).toBe("test-host");
    });
  });
});
