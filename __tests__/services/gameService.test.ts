import gameService from "@/services/gameService";

import { mockGames } from "@tests/__mocks__/games.mock";

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("gameService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return games array on successful response", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockGames),
      } as unknown as Response);

      const result = await gameService.getAll();

      expect(result).toEqual(mockGames);
    });

    it("should call the /api/games endpoint", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockGames),
      } as unknown as Response);

      await gameService.getAll();

      expect(mockedFetch).toHaveBeenCalledWith("/api/games", expect.any(Object));
    });

    it("should use GET method", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockGames),
      } as unknown as Response);

      await gameService.getAll();

      expect(mockedFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: "GET" })
      );
    });

    it("should throw an error when response is not ok", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as unknown as Response);

      await expect(gameService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });
  });

  describe("getByCategory", () => {
    it("should return games array on successful response", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockGames),
      } as unknown as Response);

      const result = await gameService.getByCategory("MMORPG");

      expect(result).toEqual(mockGames);
    });

    it("should call /api/games with the category query param", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockGames),
      } as unknown as Response);

      await gameService.getByCategory("Strategy");

      expect(mockedFetch).toHaveBeenCalledWith("/api/games?category=Strategy", expect.any(Object));
    });

    it("should throw an error when response is not ok", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as unknown as Response);

      await expect(gameService.getByCategory("Unknown")).rejects.toThrow("HTTP error! status: 404");
    });
  });
});
