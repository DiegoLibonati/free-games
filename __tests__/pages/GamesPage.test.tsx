import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import GamesPage from "@/pages/GamesPage/GamesPage";

import { gamesService } from "@/services/gamesService";

import { mockGames } from "@tests/__mocks__/games.mock";

jest.mock("@/services/gamesService");

const mockedGamesService = gamesService as jest.Mocked<typeof gamesService>;

const createStore = (games = mockGames, isLoadingGames = false, categories: string[] = []) =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      auth: {
        images: { images: [], isLoadingImages: false },
        auth: { isChecking: false, status: "authenticated" as const, errorMessage: "" },
        user: { uid: "uid-1", email: "test@test.com", displayName: "Test", photoURL: "" },
      },
      games: {
        games: { isLoading: isLoadingGames, games },
        categories: { isLoading: false, categories },
        favorites: { isLoading: false, games: [] },
        activeGame: null,
      },
      ui: {
        navBar: { isOpen: false },
        filters: { categories: { isOpen: false } },
        alert: { isOpen: false, type: "" as const, title: "", message: "" },
      },
    },
  });

type RenderPage = {
  container: HTMLElement;
};

const renderPage = (
  games = mockGames,
  isLoadingGames = false,
  categories: string[] = [],
  route = "/explore"
): RenderPage => {
  const { container } = render(
    <Provider store={createStore(games, isLoadingGames, categories)}>
      <MemoryRouter initialEntries={[route]}>
        <GamesPage />
      </MemoryRouter>
    </Provider>
  );

  return { container };
};

describe("GamesPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-games-page")).toBeInTheDocument();
  });

  it("should render the Filters heading", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
  });

  it("should render the Categories filter", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("should show loader while games are loading", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage([], true);

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show empty state when there are no games", async () => {
    mockedGamesService.getAll.mockResolvedValueOnce([]);

    renderPage([]);

    expect(await screen.findByText("¡That category does not exists!")).toBeInTheDocument();
  });

  it("should render the Games heading when games are available", async () => {
    mockedGamesService.getAll.mockResolvedValueOnce(mockGames);

    renderPage();

    expect(await screen.findByRole("heading", { name: "Games" })).toBeInTheDocument();
  });

  it("should call gamesService.getAll on mount", async () => {
    mockedGamesService.getAll.mockResolvedValueOnce(mockGames);

    renderPage();

    await screen.findAllByRole("article");

    expect(mockedGamesService.getAll).toHaveBeenCalledTimes(1);
  });
});
