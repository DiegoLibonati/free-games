import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { getDocs, doc, collection } from "firebase/firestore/lite";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import CarouselGames from "@/components/CarouselGames/CarouselGames";

import authReducer from "@/features/auth/authSlice";
import gamesReducer from "@/features/games/gamesSlice";
import uiReducer from "@/features/ui/uiSlice";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderOptions {
  name?: string;
  preloadedState?: Partial<RootState>;
}

const mockCarouselName = "Top Games";

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
  name = mockCarouselName,
  preloadedState,
}: RenderOptions = {}): RenderResult => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <CarouselGames name={name} games={mockGames} />
    </Provider>
  );
};

describe("CarouselGames", () => {
  describe("rendering", () => {
    it("should render the article element with the correct class", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>(".carousel-games")).toBeInTheDocument();
    });

    it("should render the carousel name as a heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: mockCarouselName })).toBeInTheDocument();
    });

    it("should render the games track container", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".carousel-games__track")).toBeInTheDocument();
    });

    it("should render one item per game", () => {
      const { container } = renderComponent();
      expect(container.querySelectorAll<HTMLDivElement>(".carousel-games__item")).toHaveLength(
        mockGames.length
      );
    });

    it("should render the thumbnail image for the first game", () => {
      renderComponent();
      const mockFirstGame = mockGames[0]!;
      expect(screen.getByRole("img", { name: mockFirstGame.title })).toHaveAttribute(
        "src",
        mockFirstGame.thumbnail
      );
    });

    it("should render the thumbnail image for the second game", () => {
      renderComponent();
      const mockSecondGame = mockGames[1]!;
      expect(screen.getByRole("img", { name: mockSecondGame.title })).toHaveAttribute(
        "src",
        mockSecondGame.thumbnail
      );
    });

    it("should render an Add To Fav button for each game", () => {
      renderComponent();
      expect(screen.getAllByRole("button", { name: /add .* to favorites/i })).toHaveLength(
        mockGames.length
      );
    });

    it("should render the Add To Fav button with the correct aria-label for the first game", () => {
      renderComponent();
      const mockFirstGame = mockGames[0]!;
      expect(
        screen.getByRole("button", { name: `Add ${mockFirstGame.title} to favorites` })
      ).toBeInTheDocument();
    });

    it("should render the Add To Fav button with the correct aria-label for the second game", () => {
      renderComponent();
      const mockSecondGame = mockGames[1]!;
      expect(
        screen.getByRole("button", { name: `Add ${mockSecondGame.title} to favorites` })
      ).toBeInTheDocument();
    });

    it("should render the game item with the correct id-based class", () => {
      const mockFirstGame = mockGames[0]!;
      const { container } = renderComponent();
      expect(
        container.querySelector<HTMLDivElement>(`.game-${mockFirstGame.id}`)
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    beforeEach(() => {
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({ id: "mock-doc-id" });
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
    });

    it("should call handleSetNewGameToFavorite when the first game button is clicked", async () => {
      const user = userEvent.setup();
      const mockFirstGame = mockGames[0]!;
      renderComponent();

      await user.click(
        screen.getByRole("button", { name: `Add ${mockFirstGame.title} to favorites` })
      );
    });

    it("should call handleSetNewGameToFavorite when the second game button is clicked", async () => {
      const user = userEvent.setup();
      const mockSecondGame = mockGames[1]!;
      renderComponent();

      await user.click(
        screen.getByRole("button", { name: `Add ${mockSecondGame.title} to favorites` })
      );
    });

    it("should not throw when clicking an Add To Fav button with Firebase mocked", async () => {
      const user = userEvent.setup();
      const mockFirstGame = mockGames[0]!;
      renderComponent();

      await expect(
        user.click(screen.getByRole("button", { name: `Add ${mockFirstGame.title} to favorites` }))
      ).resolves.not.toThrow();
    });
  });

  describe("edge cases", () => {
    it("should render an empty track when games prop is empty", () => {
      const store = createTestStore();
      const { container } = render(
        <Provider store={store}>
          <CarouselGames name={mockCarouselName} games={[]} />
        </Provider>
      );
      expect(container.querySelectorAll<HTMLDivElement>(".carousel-games__item")).toHaveLength(0);
    });

    it("should render a custom carousel name passed as prop", () => {
      renderComponent({ name: "Strategy Games" });
      expect(screen.getByRole("heading", { name: "Strategy Games" })).toBeInTheDocument();
    });

    it("should render the carousel name heading with the correct class", () => {
      const { container } = renderComponent();
      expect(
        container.querySelector<HTMLHeadingElement>(".carousel-games__name")
      ).toBeInTheDocument();
    });
  });
});
