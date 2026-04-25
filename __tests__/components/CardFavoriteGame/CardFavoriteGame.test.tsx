import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import CardFavoriteGame from "@/components/CardFavoriteGame/CardFavoriteGame";

import authReducer from "@/features/auth/authSlice";
import gamesReducer from "@/features/games/gamesSlice";
import uiReducer from "@/features/ui/uiSlice";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderOptions {
  id?: number;
  thumbnail?: string;
  title?: string;
  preloadedState?: Partial<RootState>;
}

const mockGame = mockGames[0]!;

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    xRapid: { apiKey: "test", apiHost: "test", apiUrl: "test" },
    firebase: {
      apiKey: "test",
      authDomain: "test",
      projectId: "test",
      storageBucket: "test",
      messagingSenderId: "test",
      appId: "test",
    },
  },
}));

jest.mock("@/firebase/config", () => ({
  FirebaseAuth: {},
  FirebaseDB: {},
}));

jest.mock("firebase/firestore/lite", () => ({
  collection: jest.fn().mockReturnValue({}),
  doc: jest.fn().mockReturnValue({}),
  setDoc: jest.fn().mockResolvedValue(undefined),
  getDocs: jest.fn().mockResolvedValue({ docs: [] }),
  deleteDoc: jest.fn().mockResolvedValue(undefined),
}));

const createTestStore = (preloadedState?: Partial<RootState>): typeof store =>
  configureStore({
    reducer: { auth: authReducer, games: gamesReducer, ui: uiReducer },
    preloadedState,
  });

const renderComponent = ({
  id = mockGame.id,
  thumbnail = mockGame.thumbnail,
  title = mockGame.title,
  preloadedState,
}: RenderOptions = {}): RenderResult => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <CardFavoriteGame id={id} thumbnail={thumbnail} title={title} />
    </Provider>
  );
};

describe("CardFavoriteGame", () => {
  describe("rendering", () => {
    it("should render the article element with the correct class", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>(".card-favorite-game")).toBeInTheDocument();
    });

    it("should render the game thumbnail image", () => {
      renderComponent();
      expect(screen.getByRole("img", { name: mockGame.title })).toBeInTheDocument();
    });

    it("should render the image with the correct src", () => {
      renderComponent();
      expect(screen.getByRole("img", { name: mockGame.title })).toHaveAttribute(
        "src",
        mockGame.thumbnail
      );
    });

    it("should render the game title", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: mockGame.title })).toBeInTheDocument();
    });

    it("should render the title with the correct class", () => {
      const { container } = renderComponent();
      const heading = container.querySelector<HTMLHeadingElement>(".card-favorite-game__title");
      expect(heading).toBeInTheDocument();
    });

    it("should render the image with the correct class", () => {
      const { container } = renderComponent();
      const img = container.querySelector<HTMLImageElement>(".card-favorite-game__img");
      expect(img).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should dispatch setActiveGame with the correct game when clicked", async () => {
      const user = userEvent.setup();
      const store = createTestStore({
        games: {
          games: { isLoading: false, games: [] },
          categories: { isLoading: false, categories: [] },
          favorites: { isLoading: false, games: mockGames },
          activeGame: null,
        },
      });
      render(
        <Provider store={store}>
          <CardFavoriteGame
            id={mockGame.id}
            thumbnail={mockGame.thumbnail}
            title={mockGame.title}
          />
        </Provider>
      );

      await user.click(screen.getByRole("article"));
      expect(store.getState().games.activeGame).toEqual(mockGame);
    });

    it("should set the active game to the one matching the clicked card id", async () => {
      const user = userEvent.setup();
      const mockSecondGame = mockGames[1]!;
      const store = createTestStore({
        games: {
          games: { isLoading: false, games: [] },
          categories: { isLoading: false, categories: [] },
          favorites: { isLoading: false, games: mockGames },
          activeGame: null,
        },
      });
      render(
        <Provider store={store}>
          <CardFavoriteGame
            id={mockSecondGame.id}
            thumbnail={mockSecondGame.thumbnail}
            title={mockSecondGame.title}
          />
        </Provider>
      );

      await user.click(screen.getByRole("article"));
      expect(store.getState().games.activeGame).toEqual(mockSecondGame);
    });

    it("should not change activeGame before the card is clicked", () => {
      const store = createTestStore({
        games: {
          games: { isLoading: false, games: [] },
          categories: { isLoading: false, categories: [] },
          favorites: { isLoading: false, games: mockGames },
          activeGame: null,
        },
      });
      render(
        <Provider store={store}>
          <CardFavoriteGame
            id={mockGame.id}
            thumbnail={mockGame.thumbnail}
            title={mockGame.title}
          />
        </Provider>
      );

      expect(store.getState().games.activeGame).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("should render with a custom title passed as prop", () => {
      renderComponent({ title: "Custom Game Title" });
      expect(screen.getByRole("heading", { name: "Custom Game Title" })).toBeInTheDocument();
    });

    it("should render with a custom thumbnail src passed as prop", () => {
      renderComponent({ thumbnail: "https://example.com/custom.jpg", title: mockGame.title });
      expect(screen.getByRole("img", { name: mockGame.title })).toHaveAttribute(
        "src",
        "https://example.com/custom.jpg"
      );
    });

    it("should render the article as a clickable element", () => {
      const { container } = renderComponent();
      const article = container.querySelector<HTMLElement>(".card-favorite-game");
      expect(article).toBeInTheDocument();
    });
  });
});
