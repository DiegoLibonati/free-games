import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HomeCard from "@/components/HomeCard/HomeCard";

import { useGamesStore } from "@/hooks/useGamesStore";

import { mockGames } from "@tests/__mocks__/games.mock";

type RenderComponent = { container: HTMLElement };

jest.mock("@/hooks/useGamesStore", () => ({ useGamesStore: jest.fn() }));

const mockHandleSetNewGameToFavorite = jest.fn();

const renderComponent = (games = mockGames): RenderComponent => {
  (useGamesStore as jest.Mock).mockReturnValue({
    games,
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
  });

  const { container } = render(<HomeCard />);

  return { container };
};

describe("HomeCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the home-card article", () => {
    renderComponent();

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should show the loader when there are no games", () => {
    const { container } = renderComponent([]);

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show the game image when games are available", () => {
    renderComponent(mockGames);

    expect(screen.getByRole("img", { hidden: false })).toBeInTheDocument();
  });

  it("should render the add-to-favorites button when a game is available", () => {
    renderComponent(mockGames);

    expect(screen.getByRole("button", { name: "Add to favorites" })).toBeInTheDocument();
  });

  it("should apply the effect-load class when there are no games", () => {
    renderComponent([]);

    expect(screen.getByRole("article")).toHaveClass("home-card--effect-load");
  });

  it("should call handleSetNewGameToFavorite when the add-to-favorites button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent(mockGames);

    await user.click(screen.getByRole("button", { name: "Add to favorites" }));

    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
  });
});
