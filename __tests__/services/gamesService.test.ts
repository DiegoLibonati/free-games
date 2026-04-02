import { gamesService } from "@/services/gamesService";

import { mockGames } from "@tests/__mocks__/games.mock";

describe("gamesService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return games array on successful response", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGames,
      });

      const result = await gamesService.getAll();

      expect(result).toEqual(mockGames);
    });

    it("should call the /api/games endpoint", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGames,
      });

      await gamesService.getAll();

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/games", expect.any(Object));
    });

    it("should use GET method", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGames,
      });

      await gamesService.getAll();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: "GET" })
      );
    });

    it("should throw an error when response is not ok", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(gamesService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });
  });

  describe("getByCategory", () => {
    it("should return games array on successful response", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGames,
      });

      const result = await gamesService.getByCategory("MMORPG");

      expect(result).toEqual(mockGames);
    });

    it("should call /api/games with the category query param", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockGames,
      });

      await gamesService.getByCategory("Strategy");

      expect(globalThis.fetch).toHaveBeenCalledWith(
        "/api/games?category=Strategy",
        expect.any(Object)
      );
    });

    it("should throw an error when response is not ok", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(gamesService.getByCategory("Unknown")).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });
  });
});
