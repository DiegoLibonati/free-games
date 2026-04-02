import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import HomeCard from "@/components/HomeCard/HomeCard";

import { mockGames } from "@tests/__mocks__/games.mock";

const createStore = (games = mockGames) =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      games: {
        games: { isLoading: false, games },
        categories: { isLoading: false, categories: [] },
        favorites: { isLoading: false, games: [] },
        activeGame: null,
      },
    },
  });

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (games = mockGames): RenderComponent => {
  const { container } = render(
    <Provider store={createStore(games)}>
      <HomeCard />
    </Provider>
  );

  return { container };
};

describe("HomeCard", () => {
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
});
