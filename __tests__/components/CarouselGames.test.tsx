import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import type { CarouselGamesProps } from "@/types/props";

import CarouselGames from "@/components/CarouselGames/CarouselGames";

import { mockGames } from "@tests/__mocks__/games.mock";

const createStore = () =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
  });

type RenderComponent = {
  container: HTMLElement;
  props: CarouselGamesProps;
};

const renderComponent = (overrides?: Partial<CarouselGamesProps>): RenderComponent => {
  const props: CarouselGamesProps = {
    name: "MMORPG",
    games: mockGames,
    ...overrides,
  };

  const { container } = render(
    <Provider store={createStore()}>
      <CarouselGames {...props} />
    </Provider>
  );

  return { container, props };
};

describe("CarouselGames", () => {
  it("should render the carousel article", () => {
    renderComponent();

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the category name", () => {
    renderComponent({ name: "MMORPG" });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("MMORPG");
  });

  it("should render an image for each game", () => {
    renderComponent({ games: mockGames });

    expect(screen.getAllByRole("img")).toHaveLength(mockGames.length);
  });

  it("should render an add-to-favorites button for each game", () => {
    renderComponent({ games: mockGames });

    expect(screen.getAllByRole("button")).toHaveLength(mockGames.length);
  });

  it("should render no images when games array is empty", () => {
    renderComponent({ games: [] });

    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
