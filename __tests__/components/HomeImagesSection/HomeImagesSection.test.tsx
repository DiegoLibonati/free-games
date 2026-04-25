import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import HomeImagesSection from "@/components/HomeImagesSection/HomeImagesSection";

import authReducer from "@/features/auth/authSlice";
import gamesReducer from "@/features/games/gamesSlice";
import uiReducer from "@/features/ui/uiSlice";

import { imagesOfGames } from "@/constants/data";

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

const renderComponent = (preloadedState?: Partial<RootState>): RenderResult => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <HomeImagesSection />
    </Provider>
  );
};

describe("HomeImagesSection", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("rendering", () => {
    it("should render the home images section", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>(".home-images")).toBeInTheDocument();
    });

    it("should render the correct number of image backgrounds", () => {
      const { container } = renderComponent();
      expect(container.querySelectorAll<HTMLDivElement>(".home-images__background")).toHaveLength(
        imagesOfGames.length
      );
    });

    it("should render the HomeCard component", () => {
      renderComponent();
      expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("should render the first image background as active when autoIndex is 0", () => {
      const { container } = renderComponent();
      const backgrounds = container.querySelectorAll<HTMLDivElement>(".home-images__background");
      expect(backgrounds[0]).toHaveClass("home-images__background--active-slide");
    });
  });
});
