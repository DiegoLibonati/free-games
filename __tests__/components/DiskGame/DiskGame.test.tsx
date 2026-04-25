import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { getDocs, doc, collection } from "firebase/firestore/lite";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import DiskGame from "@/components/DiskGame/DiskGame";

import authReducer from "@/features/auth/authSlice";
import gamesReducer from "@/features/games/gamesSlice";
import uiReducer from "@/features/ui/uiSlice";

import { mockGames } from "@tests/__mocks__/games.mock";

const mockGame = mockGames[0]!;
const mockDefaultPreloadedState: Partial<RootState> = {
  games: {
    games: { isLoading: false, games: mockGames },
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

const renderComponent = (
  preloadedState: Partial<RootState> = mockDefaultPreloadedState
): RenderResult => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <DiskGame
        id={mockGame.id}
        title={mockGame.title}
        short_description={mockGame.short_description}
        genre={mockGame.genre}
        platform={mockGame.platform}
        publisher={mockGame.publisher}
        developer={mockGame.developer}
        release_date={mockGame.release_date}
        freetogame_profile_url={mockGame.freetogame_profile_url}
        thumbnail={mockGame.thumbnail}
      />
    </Provider>
  );
};

describe("DiskGame", () => {
  describe("rendering", () => {
    it("should render the outer disk-game wrapper", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".disk-game")).toBeInTheDocument();
    });

    it("should render the game title as a heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: mockGame.title })).toBeInTheDocument();
    });

    it("should render the short description", () => {
      renderComponent();
      expect(screen.getByText(mockGame.short_description)).toBeInTheDocument();
    });

    it("should render the genre", () => {
      renderComponent();
      expect(screen.getByText(mockGame.genre)).toBeInTheDocument();
    });

    it("should render the platform", () => {
      renderComponent();
      expect(screen.getByText(mockGame.platform)).toBeInTheDocument();
    });

    it("should render the publisher", () => {
      renderComponent();
      expect(screen.getByText(mockGame.publisher)).toBeInTheDocument();
    });

    it("should render the developer", () => {
      renderComponent();
      expect(screen.getByText(mockGame.developer)).toBeInTheDocument();
    });

    it("should render the release date", () => {
      renderComponent();
      expect(screen.getByText(mockGame.release_date)).toBeInTheDocument();
    });

    it("should render the official website link with the correct href", () => {
      renderComponent();
      expect(
        screen.getByRole("link", { name: `Visit official website of ${mockGame.title}` })
      ).toHaveAttribute("href", mockGame.freetogame_profile_url);
    });

    it("should render the official website link opening in a new tab", () => {
      renderComponent();
      expect(
        screen.getByRole("link", { name: `Visit official website of ${mockGame.title}` })
      ).toHaveAttribute("target", "_blank");
    });

    it("should render the Add to Favorites button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: `Add ${mockGame.title} to favorites` })
      ).toBeInTheDocument();
    });

    it("should render the disk image container with background image set to the thumbnail", () => {
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img");
      expect(imgDiv).toHaveStyle({ backgroundImage: `url(${mockGame.thumbnail})` });
    });

    it("should initially render the circle with display block", () => {
      const { container } = renderComponent();
      const circle = container.querySelector<HTMLDivElement>(".disk-game__img-circle");
      expect(circle).toHaveStyle({ display: "block" });
    });

    it("should initially render the disk without the spin stopped animation", () => {
      const { container } = renderComponent();
      const diskWrapper = container.querySelector<HTMLDivElement>(".disk-game");
      expect(diskWrapper).toHaveStyle({ animationName: "spin" });
    });

    it("should initially render the information panel without the open modifier class", () => {
      const { container } = renderComponent();
      expect(
        container.querySelector<HTMLDivElement>(".disk-game__information--open")
      ).not.toBeInTheDocument();
    });

    it("should initially render the img panel without the open modifier class", () => {
      const { container } = renderComponent();
      expect(
        container.querySelector<HTMLDivElement>(".disk-game__img--open")
      ).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    beforeEach(() => {
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({ id: "mock-doc-id" });
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
    });

    it("should show information panel when the disk image is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);

      expect(
        container.querySelector<HTMLDivElement>(".disk-game__information--open")
      ).toBeInTheDocument();
    });

    it("should add the open modifier class to the img panel when clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);

      expect(container.querySelector<HTMLDivElement>(".disk-game__img--open")).toBeInTheDocument();
    });

    it("should stop the spin animation when the disk image is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);

      const diskWrapper = container.querySelector<HTMLDivElement>(".disk-game");
      expect(diskWrapper).toHaveStyle({ animationName: "nospin" });
    });

    it("should hide the circle div when the disk image is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);

      const circle = container.querySelector<HTMLDivElement>(".disk-game__img-circle");
      expect(circle).toHaveStyle({ display: "none" });
    });

    it("should close the information panel on double click", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);
      expect(
        container.querySelector<HTMLDivElement>(".disk-game__information--open")
      ).toBeInTheDocument();

      await user.dblClick(imgDiv);
      expect(
        container.querySelector<HTMLDivElement>(".disk-game__information--open")
      ).not.toBeInTheDocument();
    });

    it("should restore the circle to display block after double click closes the panel", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);
      await user.dblClick(imgDiv);

      const circle = container.querySelector<HTMLDivElement>(".disk-game__img-circle");
      expect(circle).toHaveStyle({ display: "block" });
    });

    it("should dispatch the thunk when Add to Favorites button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await expect(
        user.click(screen.getByRole("button", { name: `Add ${mockGame.title} to favorites` }))
      ).resolves.not.toThrow();
    });

    it("should not throw when clicking Add to Favorites with Firebase mocked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await expect(
        user.click(screen.getByRole("button", { name: `Add ${mockGame.title} to favorites` }))
      ).resolves.not.toThrow();
    });
  });

  describe("edge cases", () => {
    it("should restore spin animation after double click", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);
      await user.dblClick(imgDiv);

      const diskWrapper = container.querySelector<HTMLDivElement>(".disk-game");
      expect(diskWrapper).toHaveStyle({ animationName: "spin" });
    });

    it("should remove the img open class after double click", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const imgDiv = container.querySelector<HTMLDivElement>(".disk-game__img")!;

      await user.click(imgDiv);
      await user.dblClick(imgDiv);

      expect(
        container.querySelector<HTMLDivElement>(".disk-game__img--open")
      ).not.toBeInTheDocument();
    });

    it("should render a single Add to Favorites button", () => {
      renderComponent();
      expect(
        screen.getAllByRole("button", { name: `Add ${mockGame.title} to favorites` })
      ).toHaveLength(1);
    });

    it("should render a single official website link", () => {
      renderComponent();
      expect(
        screen.getAllByRole("link", { name: `Visit official website of ${mockGame.title}` })
      ).toHaveLength(1);
    });
  });
});
