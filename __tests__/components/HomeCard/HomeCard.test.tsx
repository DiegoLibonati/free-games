import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import HomeCard from "@/components/HomeCard/HomeCard";

import authReducer from "@/features/auth/authSlice";
import gamesReducer from "@/features/games/gamesSlice";
import uiReducer from "@/features/ui/uiSlice";

import { mockGames } from "@tests/__mocks__/games.mock";

const mockGamesState = {
  games: {
    games: { isLoading: false, games: mockGames },
    categories: { isLoading: false, categories: [] },
    favorites: { isLoading: false, games: [] },
    activeGame: null,
  },
};
const mockEmptyGamesState = {
  games: {
    games: { isLoading: false, games: [] },
    categories: { isLoading: false, categories: [] },
    favorites: { isLoading: false, games: [] },
    activeGame: null,
  },
};

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
  doc: jest.fn().mockReturnValue({ id: "mock-doc-id" }),
  setDoc: jest.fn().mockResolvedValue(undefined),
  getDocs: jest.fn().mockResolvedValue({ docs: [] }),
  deleteDoc: jest.fn().mockResolvedValue(undefined),
}));

const createTestStore = (preloadedState?: Partial<RootState>): typeof store =>
  configureStore({
    reducer: { auth: authReducer, games: gamesReducer, ui: uiReducer },
    preloadedState,
  });

const renderComponent = (preloadedState?: Partial<RootState>): RenderResult => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <HomeCard />
    </Provider>
  );
};

beforeEach(() => {
  const firestore = jest.requireMock("firebase/firestore/lite");
  firestore.collection.mockReturnValue({});
  firestore.doc.mockReturnValue({ id: "mock-doc-id" });
  firestore.setDoc.mockResolvedValue(undefined);
  firestore.getDocs.mockResolvedValue({ docs: [] });
  firestore.deleteDoc.mockResolvedValue(undefined);
});

describe("HomeCard", () => {
  describe("rendering", () => {
    it("should render the article element with home-card class", () => {
      const { container } = renderComponent(mockGamesState);
      expect(container.querySelector<HTMLElement>(".home-card")).toBeInTheDocument();
    });

    it("should render the Loader when games list is empty", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
    });

    it("should render the article with home-card--effect-load class when games list is empty", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelector<HTMLElement>(".home-card--effect-load")).toBeInTheDocument();
    });

    it("should not render the article with home-card--effect-load class when a game is available", () => {
      const { container } = renderComponent(mockGamesState);
      expect(
        container.querySelector<HTMLElement>(".home-card--effect-load")
      ).not.toBeInTheDocument();
    });

    it("should render a game title heading when games are available", () => {
      renderComponent(mockGamesState);
      const titles = mockGames.map((g) => g.title);
      const rendered = titles.some((title) => screen.queryByRole("heading", { name: title }));
      expect(rendered).toBe(true);
    });

    it("should render a game thumbnail image when games are available", () => {
      renderComponent(mockGamesState);
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });

    it("should render the Add to favorite button when a game is available", () => {
      renderComponent(mockGamesState);
      expect(screen.getByRole("button", { name: /add to favorite/i })).toBeInTheDocument();
    });

    it("should not render the Add to favorite button when games list is empty", () => {
      renderComponent(mockEmptyGamesState);
      expect(screen.queryByRole("button", { name: /add to favorite/i })).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call getDocs when clicking Add to favorite", async () => {
      const { getDocs } = jest.requireMock("firebase/firestore/lite");
      const user = userEvent.setup();
      renderComponent(mockGamesState);
      await user.click(screen.getByRole("button", { name: /add to favorite/i }));
      await act(async () => {
        // Empty fn
      });
      expect(getDocs).toHaveBeenCalled();
    });

    it("should call setDoc when adding a game to favorites and it does not already exist", async () => {
      const { setDoc } = jest.requireMock("firebase/firestore/lite");
      const user = userEvent.setup();
      renderComponent(mockGamesState);
      await user.click(screen.getByRole("button", { name: /add to favorite/i }));
      await act(async () => {
        // Empty fn
      });
      expect(setDoc).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should render article with home-card class and not loading class when exactly one game exists", () => {
      const { container } = renderComponent({
        games: {
          games: { isLoading: false, games: [mockGames[0]!] },
          categories: { isLoading: false, categories: [] },
          favorites: { isLoading: false, games: [] },
          activeGame: null,
        },
      });
      expect(container.querySelector<HTMLElement>(".home-card")).toBeInTheDocument();
      expect(
        container.querySelector<HTMLElement>(".home-card--effect-load")
      ).not.toBeInTheDocument();
    });

    it("should not render Loader when games are available", () => {
      const { container } = renderComponent(mockGamesState);
      expect(
        container.querySelector<HTMLDivElement>(".loader-all-wrapper")
      ).not.toBeInTheDocument();
    });
  });
});
