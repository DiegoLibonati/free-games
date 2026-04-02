import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import HomePage from "@/pages/HomePage/HomePage";

import { gamesService } from "@/services/gamesService";

import { mockGames } from "@tests/__mocks__/games.mock";

jest.mock("@/services/gamesService");

const mockedGamesService = gamesService as jest.Mocked<typeof gamesService>;

const createStore = (games = mockGames, isLoadingGames = false) =>
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
        categories: { isLoading: false, categories: [] },
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

const renderPage = (games = mockGames, isLoadingGames = false): RenderPage => {
  const { container } = render(
    <Provider store={createStore(games, isLoadingGames)}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );

  return { container };
};

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-home-page")).toBeInTheDocument();
  });

  it("should render the Upcoming Games section", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByText("Upcoming Games")).toBeInTheDocument();
  });

  it("should render the Other Games section heading", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByText("Other Games")).toBeInTheDocument();
  });

  it("should render the footer", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should render the navbar", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should call gamesService.getAll on mount", async () => {
    mockedGamesService.getAll.mockResolvedValueOnce(mockGames);

    renderPage();

    await screen.findByText("Other Games");

    expect(mockedGamesService.getAll).toHaveBeenCalledTimes(1);
  });
});
