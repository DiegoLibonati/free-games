import { render, screen, waitFor } from "@testing-library/react";

import CarouselsGamesSection from "@/components/CarouselsGamesSection/CarouselsGamesSection";

import { useGamesStore } from "@/hooks/useGamesStore";

import { gamesService } from "@/services/gamesService";

import { mockGames } from "@tests/__mocks__/games.mock";

jest.mock("@/hooks/useGamesStore", () => ({ useGamesStore: jest.fn() }));
jest.mock("@/services/gamesService");

const mockedGamesService = gamesService as jest.Mocked<typeof gamesService>;

const renderComponent = (categories: string[] = []) => {
  (useGamesStore as jest.Mock).mockReturnValue({
    categories,
    handleSetNewGameToFavorite: jest.fn(),
  });

  const { container } = render(<CarouselsGamesSection />);

  return { container };
};

describe("CarouselsGamesSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the carousels section", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLElement>(".carousels")).toBeInTheDocument();
  });

  it("should render no carousels when categories are empty", () => {
    renderComponent([]);

    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("should render a CarouselGames for each category after data loads", async () => {
    mockedGamesService.getByCategory.mockResolvedValue(mockGames);

    renderComponent(["MMORPG", "Strategy"]);

    expect(await screen.findByRole("heading", { name: "MMORPG" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Strategy" })).toBeInTheDocument();
  });

  it("should render no leftover loaders after all categories finish loading", async () => {
    mockedGamesService.getByCategory.mockResolvedValue(mockGames);

    const { container } = renderComponent(["MMORPG"]);

    await waitFor(() => {
      expect(container.querySelector(".loader-all-wrapper")).not.toBeInTheDocument();
    });
  });

  it("should render no leftover loaders when a category fetch fails", async () => {
    mockedGamesService.getByCategory.mockRejectedValue(new Error("Network error"));

    const { container } = renderComponent(["MMORPG"]);

    await waitFor(() => {
      expect(container.querySelector(".loader-all-wrapper")).not.toBeInTheDocument();
    });
  });
});
