import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import type { CardGameProps } from "@/types/props";

import CardGame from "@/components/CardGame/CardGame";

import { mockGames } from "@tests/__mocks__/games.mock";

const createStore = () =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      games: {
        games: { isLoading: false, games: mockGames },
        categories: { isLoading: false, categories: [] },
        favorites: { isLoading: false, games: [] },
        activeGame: null,
      },
    },
  });

type RenderComponent = {
  container: HTMLElement;
  props: CardGameProps;
};

const renderComponent = (overrides?: Partial<CardGameProps>): RenderComponent => {
  const [firstGame] = mockGames;

  const props: CardGameProps = {
    id: firstGame.id,
    thumbnail: firstGame.thumbnail,
    title: firstGame.title,
    ...overrides,
  };

  const { container } = render(
    <Provider store={createStore()}>
      <CardGame {...props} />
    </Provider>
  );

  return { container, props };
};

describe("CardGame", () => {
  it("should render an article element", () => {
    renderComponent();

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the game thumbnail", () => {
    const [game] = mockGames;
    renderComponent({ thumbnail: game.thumbnail });

    expect(screen.getByRole("img")).toHaveAttribute("src", game.thumbnail);
  });

  it("should render the game title", () => {
    const [game] = mockGames;
    renderComponent({ title: game.title });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(game.title);
  });

  it("should set activeGame in the store when clicked", async () => {
    const user = userEvent.setup();
    const store = createStore();

    const [game] = mockGames;

    render(
      <Provider store={store}>
        <CardGame id={game.id} thumbnail={game.thumbnail} title={game.title} />
      </Provider>
    );

    await user.click(screen.getByRole("article"));

    expect(store.getState().games.activeGame).toEqual(game);
  });
});
