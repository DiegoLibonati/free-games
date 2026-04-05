import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import GamesPage from "@/pages/GamesPage/GamesPage";

import { useGamesStore } from "@/hooks/useGamesStore";
import { useUiStore } from "@/hooks/useUiStore";
import { useAuthStore } from "@/hooks/useAuthStore";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderPage {
  container: HTMLElement;
}

const mockHandleGetGamesByCategory = jest.fn();
const mockHandleSetToInitialState = jest.fn();
const mockHandleOpenFilterCategories = jest.fn();
const mockHandleCloseFilterCategories = jest.fn();
const mockHandleSetActiveGame = jest.fn();
const mockHandleOpenNavBar = jest.fn();
const mockHandleCloseNavBar = jest.fn();
const mockHandleOpenAlert = jest.fn();
const mockHandleCloseAlert = jest.fn();
const mockHandleLogOut = jest.fn();

jest.mock("@/hooks/useGamesStore");
jest.mock("@/hooks/useAuthStore");
jest.mock("@/hooks/useUiStore");

const renderPage = ({
  games = mockGames,
  isLoadingGames = false,
  categories = [] as string[],
  isFilterCategoriesOpen = false,
  route = "/explore",
} = {}): RenderPage => {
  (useGamesStore as jest.Mock).mockReturnValue({
    games,
    isLoadingGames,
    categories,
    handleGetGamesByCategory: mockHandleGetGamesByCategory,
    handleSetToInitialState: mockHandleSetToInitialState,
    handleSetActiveGame: mockHandleSetActiveGame,
  });

  (useUiStore as jest.Mock).mockReturnValue({
    isNavBarOpen: false,
    isFilterCategoriesOpen,
    handleOpenNavBar: mockHandleOpenNavBar,
    handleCloseNavBar: mockHandleCloseNavBar,
    handleOpenFilterCategories: mockHandleOpenFilterCategories,
    handleCloseFilterCategories: mockHandleCloseFilterCategories,
    handleOpenAlert: mockHandleOpenAlert,
    handleCloseAlert: mockHandleCloseAlert,
    alert: { isOpen: false, type: "", title: "", message: "" },
  });

  (useAuthStore as jest.Mock).mockReturnValue({
    displayName: "Test",
    photoURL: "",
    handleLogOut: mockHandleLogOut,
  });

  const { container } = render(
    <MemoryRouter initialEntries={[route]}>
      <GamesPage />
    </MemoryRouter>
  );

  return { container };
};

describe("GamesPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-games-page")).toBeInTheDocument();
  });

  it("should render the Filters heading", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
  });

  it("should render the Categories filter", () => {
    renderPage();

    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("should show loader while games are loading", () => {
    const { container } = renderPage({ isLoadingGames: true });

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show empty state when there are no games", () => {
    renderPage({ games: [] });

    expect(screen.getByText("¡That category does not exists!")).toBeInTheDocument();
  });

  it("should render the Games heading when games are available", () => {
    renderPage({ games: mockGames });

    expect(screen.getByRole("heading", { name: "Games" })).toBeInTheDocument();
  });

  it("should render a card article for each available game", () => {
    const { container } = renderPage({ games: mockGames });

    const cards = container.querySelectorAll<HTMLElement>(".card-game-games");
    expect(cards).toHaveLength(mockGames.length);
  });

  it("should call handleGetGamesByCategory with empty string on mount when no query param", () => {
    renderPage({ route: "/explore" });

    expect(mockHandleGetGamesByCategory).toHaveBeenCalledWith("");
  });

  it("should call handleGetGamesByCategory with the category from the URL query param", () => {
    renderPage({ route: "/explore?q=MMORPG" });

    expect(mockHandleGetGamesByCategory).toHaveBeenCalledWith("MMORPG");
  });
});
