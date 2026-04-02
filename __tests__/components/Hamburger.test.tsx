import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import Hamburger from "@/components/Hamburger/Hamburger";

const createStore = (navBarOpen = false) =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      ui: {
        navBar: { isOpen: navBarOpen },
        filters: { categories: { isOpen: false } },
        alert: { isOpen: false, type: "" as const, title: "", message: "" },
      },
    },
  });

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (navBarOpen = false): RenderComponent => {
  const store = createStore(navBarOpen);

  const { container } = render(
    <Provider store={store}>
      <Hamburger />
    </Provider>
  );

  return { container };
};

describe("Hamburger", () => {
  it("should render the hamburger element", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".hamburger")).toBeInTheDocument();
  });

  it("should render 3 span lines", () => {
    const { container } = renderComponent();

    expect(container.querySelectorAll(".hamburger__span")).toHaveLength(3);
  });

  it("should not have the open class when navbar is closed", () => {
    const { container } = renderComponent(false);

    expect(container.querySelector<HTMLDivElement>(".hamburger")).not.toHaveClass(
      "hamburger--open"
    );
  });

  it("should have the open class when navbar is open", () => {
    const { container } = renderComponent(true);

    expect(container.querySelector<HTMLDivElement>(".hamburger")).toHaveClass("hamburger--open");
  });

  it("should toggle to open state when clicked while closed", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent(false);

    await user.click(container.querySelector<HTMLDivElement>(".hamburger")!);

    expect(container.querySelector<HTMLDivElement>(".hamburger")).toHaveClass("hamburger--open");
  });

  it("should toggle to closed state when clicked while open", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent(true);

    await user.click(container.querySelector<HTMLDivElement>(".hamburger")!);

    expect(container.querySelector<HTMLDivElement>(".hamburger")).not.toHaveClass(
      "hamburger--open"
    );
  });
});
