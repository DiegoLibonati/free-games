import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import ActiveGame from "@/components/ActiveGame/ActiveGame";
import { RootState } from "@/app/store";

import { mockGames } from "@tests/__mocks__/games.mock";

const [activeGame] = mockGames;

const createStore = () =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      games: {
        games: { isLoading: false, games: mockGames },
        categories: { isLoading: false, categories: [] },
        favorites: { isLoading: false, games: [] },
        activeGame,
      },
    },
  });

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (initialRoute = "/explore"): RenderComponent => {
  const { container } = render(
    <Provider store={createStore()}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <ActiveGame />
      </MemoryRouter>
    </Provider>
  );

  return { container };
};

describe("ActiveGame", () => {
  it("should render the modal wrapper", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".active-game-wrapper")).toBeInTheDocument();
  });

  it("should render the game title", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(activeGame!.title);
  });

  it("should render the game description", () => {
    renderComponent();

    expect(screen.getByText(activeGame!.short_description)).toBeInTheDocument();
  });

  it("should render the close button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Close game details" })).toBeInTheDocument();
  });

  it("should render the official website link", () => {
    renderComponent();

    expect(
      screen.getByRole("link", { name: `Visit official website of ${activeGame!.title}` })
    ).toHaveAttribute("href", activeGame!.game_url);
  });

  it("should render the remove-from-favorites button on /favorite route", () => {
    renderComponent("/favorite");

    expect(
      screen.getByRole("button", { name: `Remove ${activeGame!.title} from favorites` })
    ).toBeInTheDocument();
  });

  it("should render the add-to-favorites button on /explore route", () => {
    renderComponent("/explore");

    expect(
      screen.getByRole("button", { name: `Add ${activeGame!.title} to favorites` })
    ).toBeInTheDocument();
  });

  it("should clear the activeGame when close button is clicked", async () => {
    const user = userEvent.setup();
    const store = createStore();

    const ConditionalActiveGame = () => {
      const active = useSelector((state: RootState) => state.games.activeGame);
      return active ? <ActiveGame /> : null;
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalActiveGame />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByRole("button", { name: "Close game details" }));

    expect(store.getState().games.activeGame).toBeNull();
  });
});
