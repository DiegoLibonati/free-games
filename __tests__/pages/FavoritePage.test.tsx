import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import FavoritePage from "@/pages/FavoritePage/FavoritePage";

import { mockGames } from "@tests/__mocks__/games.mock";

const createStore = (favorites: typeof mockGames = [], isLoadingFavoritesGames = false) =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      auth: {
        images: { images: [], isLoadingImages: false },
        auth: { isChecking: false, status: "authenticated" as const, errorMessage: "" },
        user: { uid: "uid-1", email: "test@test.com", displayName: "Test", photoURL: "" },
      },
      games: {
        games: { isLoading: false, games: [] },
        categories: { isLoading: false, categories: [] },
        favorites: { isLoading: isLoadingFavoritesGames, games: favorites },
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
  favorites: typeof mockGames = [],
  isLoadingFavoritesGames = false
): RenderPage => {
  const { container } = render(
    <Provider store={createStore(favorites, isLoadingFavoritesGames)}>
      <MemoryRouter>
        <FavoritePage />
      </MemoryRouter>
    </Provider>
  );

  return { container };
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

  it("should show empty state message when there are no favorites", async () => {
    renderPage([]);

    const heading = await screen.findByRole("heading", {
      name: /Add a game to your favorites list/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("should not show the empty state when favorites are available", () => {
    renderPage(mockGames);

    expect(screen.queryByText("Add a game to your favorites list")).not.toBeInTheDocument();
  });
});
