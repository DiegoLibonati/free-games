import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { RenderResult } from "@testing-library/react";
import type { RootState, store } from "@/app/store";

import Hamburger from "@/components/Hamburger/Hamburger";

import authReducer from "@/features/auth/authSlice";
import gamesReducer from "@/features/games/gamesSlice";
import uiReducer from "@/features/ui/uiSlice";

const mockClosedUiState = {
  ui: {
    navBar: { isOpen: false },
    filters: { categories: { isOpen: false } },
    alert: { isOpen: false, type: "" as const, title: "", message: "" },
  },
};
const mockOpenUiState = {
  ui: {
    navBar: { isOpen: true },
    filters: { categories: { isOpen: false } },
    alert: { isOpen: false, type: "" as const, title: "", message: "" },
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

const renderComponent = (preloadedState?: Partial<RootState>): RenderResult => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <Hamburger />
    </Provider>
  );
};

describe("Hamburger", () => {
  describe("rendering", () => {
    it("should render the hamburger div", () => {
      const { container } = renderComponent(mockClosedUiState);
      expect(container.querySelector<HTMLDivElement>(".hamburger")).toBeInTheDocument();
    });

    it("should render three span elements inside the hamburger", () => {
      const { container } = renderComponent(mockClosedUiState);
      expect(container.querySelectorAll<HTMLSpanElement>(".hamburger__span")).toHaveLength(3);
    });

    it("should have class hamburger but not hamburger--open when navBar is closed", () => {
      const { container } = renderComponent(mockClosedUiState);
      const div = container.querySelector<HTMLDivElement>(".hamburger");
      expect(div).toBeInTheDocument();
      expect(div).not.toHaveClass("hamburger--open");
    });

    it("should have class hamburger--open when navBar is open", () => {
      const { container } = renderComponent(mockOpenUiState);
      expect(
        container.querySelector<HTMLDivElement>(".hamburger.hamburger--open")
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should dispatch openNavBar when clicked and navBar is closed", async () => {
      const user = userEvent.setup();
      const store = createTestStore(mockClosedUiState);
      const { container } = render(
        <Provider store={store}>
          <Hamburger />
        </Provider>
      );
      const hamburger = container.querySelector<HTMLDivElement>(".hamburger")!;
      await user.click(hamburger);
      expect(store.getState().ui.navBar.isOpen).toBe(true);
    });

    it("should dispatch closeNavBar when clicked and navBar is open", async () => {
      const user = userEvent.setup();
      const store = createTestStore(mockOpenUiState);
      const { container } = render(
        <Provider store={store}>
          <Hamburger />
        </Provider>
      );
      const hamburger = container.querySelector<HTMLDivElement>(".hamburger")!;
      await user.click(hamburger);
      expect(store.getState().ui.navBar.isOpen).toBe(false);
    });

    it("should update class to hamburger--open after clicking when closed", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent(mockClosedUiState);
      const hamburger = container.querySelector<HTMLDivElement>(".hamburger")!;
      await user.click(hamburger);
      expect(hamburger).toHaveClass("hamburger--open");
    });

    it("should remove hamburger--open class after clicking when open", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent(mockOpenUiState);
      const hamburger = container.querySelector<HTMLDivElement>(".hamburger")!;
      await user.click(hamburger);
      expect(hamburger).not.toHaveClass("hamburger--open");
    });
  });

  describe("edge cases", () => {
    it("should render exactly one hamburger div", () => {
      const { container } = renderComponent(mockClosedUiState);
      expect(container.querySelectorAll<HTMLDivElement>(".hamburger")).toHaveLength(1);
    });

    it("should keep navBar closed after rendering without interaction", () => {
      const store = createTestStore(mockClosedUiState);
      render(
        <Provider store={store}>
          <Hamburger />
        </Provider>
      );
      expect(store.getState().ui.navBar.isOpen).toBe(false);
    });
  });
});
