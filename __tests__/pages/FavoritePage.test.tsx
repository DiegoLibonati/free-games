import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FavoritePage from "@/pages/FavoritePage/FavoritePage";

import { useGamesStore } from "@/hooks/useGamesStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useUiStore } from "@/hooks/useUiStore";

import { mockGames } from "@tests/__mocks__/games.mock";

type RenderPage = { container: HTMLElement; unmount: () => void };

const mockHandleGetFavoriteGames = jest.fn();
const mockHandleSetToInitialState = jest.fn();
const mockHandleSetActiveGame = jest.fn();
const mockHandleLogOut = jest.fn();
const mockHandleOpenNavBar = jest.fn();
const mockHandleCloseNavBar = jest.fn();

jest.mock("@/hooks/useGamesStore");
jest.mock("@/hooks/useAuthStore");
jest.mock("@/hooks/useUiStore");

const renderPage = (
  favorites: typeof mockGames = [],
  isLoadingFavoritesGames = false
): RenderPage => {
  (useGamesStore as jest.Mock).mockReturnValue({
    favoritesGames: favorites,
    isLoadingFavoritesGames,
    handleGetFavoriteGames: mockHandleGetFavoriteGames,
    handleSetToInitialState: mockHandleSetToInitialState,
    handleSetActiveGame: mockHandleSetActiveGame,
  });

  (useAuthStore as jest.Mock).mockReturnValue({
    displayName: "Test",
    photoURL: "",
    handleLogOut: mockHandleLogOut,
  });

  (useUiStore as jest.Mock).mockReturnValue({
    isNavBarOpen: false,
    handleOpenNavBar: mockHandleOpenNavBar,
    handleCloseNavBar: mockHandleCloseNavBar,
  });

  const { container, unmount } = render(
    <MemoryRouter>
      <FavoritePage />
    </MemoryRouter>
  );

  return { container, unmount };
};

describe("FavoritePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-favorite-page")).toBeInTheDocument();
  });

  it("should show loader while fetching favorites", () => {
    const { container } = renderPage([], true);

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show empty state message when there are no favorites", () => {
    renderPage([]);

    expect(
      screen.getByRole("heading", { name: /Add a game to your favorites list/i })
    ).toBeInTheDocument();
  });

  it("should not show the empty state when favorites are available", () => {
    renderPage(mockGames);

    expect(screen.queryByText("Add a game to your favorites list")).not.toBeInTheDocument();
  });

  it("should call handleGetFavoriteGames on mount", () => {
    renderPage();

    expect(mockHandleGetFavoriteGames).toHaveBeenCalledTimes(1);
  });

  it("should call handleSetToInitialState on unmount", () => {
    const { unmount } = renderPage();

    unmount();

    expect(mockHandleSetToInitialState).toHaveBeenCalledTimes(1);
  });

  it("should render a card for each favorite game", () => {
    renderPage(mockGames);

    mockGames.forEach((game) => {
      expect(screen.getByRole("heading", { name: game.title })).toBeInTheDocument();
    });
  });
});
