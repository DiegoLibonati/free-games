import { render, screen, waitFor } from "@testing-library/react";

import CarouselsGamesSection from "@/components/CarouselsGamesSection/CarouselsGamesSection";

import { useGamesStore } from "@/hooks/useGamesStore";

import gameService from "@/services/gameService";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderComponent {
  container: HTMLElement;
}

const mockedGameService = gameService as jest.Mocked<typeof gameService>;
const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("@/hooks/useGamesStore");
jest.mock("@/services/gameService");

const renderComponent = (categories: string[] = []): RenderComponent => {
  (useGamesStore as jest.Mock).mockReturnValue({
    categories,
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
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
    mockedGameService.getByCategory.mockResolvedValue(mockGames);

    renderComponent(["MMORPG", "Strategy"]);

    expect(await screen.findByRole("heading", { name: "MMORPG" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Strategy" })).toBeInTheDocument();
  });

  it("should render no leftover loaders after all categories finish loading", async () => {
    mockedGameService.getByCategory.mockResolvedValue(mockGames);

    const { container } = renderComponent(["MMORPG"]);

    await waitFor(() => {
      expect(container.querySelector(".loader-all-wrapper")).not.toBeInTheDocument();
    });
  });

  it("should render no leftover loaders when a category fetch fails", async () => {
    mockedGameService.getByCategory.mockRejectedValue(new Error("Network error"));

    const { container } = renderComponent(["MMORPG"]);

    await waitFor(() => {
      expect(container.querySelector(".loader-all-wrapper")).not.toBeInTheDocument();
    });
  });
});
