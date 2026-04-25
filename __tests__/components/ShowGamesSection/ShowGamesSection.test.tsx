import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import ShowGamesSection from "@/components/ShowGamesSection/ShowGamesSection";

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
      <ShowGamesSection />
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

describe("ShowGamesSection", () => {
  describe("rendering", () => {
    it("should render the section with show-games class", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelector<HTMLElement>(".show-games")).toBeInTheDocument();
    });

    it("should render the Other Games heading", () => {
      renderComponent(mockEmptyGamesState);
      expect(screen.getByRole("heading", { name: /other games/i })).toBeInTheDocument();
    });

    it("should render the line separator article", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelector<HTMLElement>(".line-wrapper")).toBeInTheDocument();
    });

    it("should render the show-games__cards article", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelector<HTMLElement>(".show-games__cards")).toBeInTheDocument();
    });

    it("should render DiskGame cards when games are available", () => {
      const { container } = renderComponent(mockGamesState);
      expect(container.querySelectorAll<HTMLDivElement>(".disk-game").length).toBeGreaterThan(0);
    });

    it("should render at most 12 DiskGame cards", () => {
      const { container } = renderComponent(mockGamesState);
      expect(container.querySelectorAll<HTMLDivElement>(".disk-game").length).toBeLessThanOrEqual(
        12
      );
    });

    it("should not render any DiskGame cards when games list is empty", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelectorAll<HTMLDivElement>(".disk-game").length).toBe(0);
    });
  });

  describe("behavior", () => {
    it("should render the same number of DiskGame cards as mockGames when there are fewer than 12", () => {
      const { container } = renderComponent(mockGamesState);
      expect(container.querySelectorAll<HTMLDivElement>(".disk-game").length).toBe(
        mockGames.length
      );
    });
  });

  describe("edge cases", () => {
    it("should render Other Games heading regardless of games state", () => {
      renderComponent(mockEmptyGamesState);
      expect(screen.getByText("Other Games")).toBeInTheDocument();
    });

    it("should render show-games__title with correct class", () => {
      const { container } = renderComponent(mockEmptyGamesState);
      expect(container.querySelector<HTMLHeadingElement>(".show-games__title")).toBeInTheDocument();
    });
  });
});
