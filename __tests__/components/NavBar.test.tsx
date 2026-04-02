import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import NavBar from "@/components/NavBar/NavBar";

const createStore = (displayName = "TestUser", photoURL = "") =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      auth: {
        images: { images: [], isLoadingImages: false },
        auth: { isChecking: false, status: "authenticated" as const, errorMessage: "" },
        user: { uid: "uid-1", email: "test@test.com", displayName, photoURL },
      },
      ui: {
        navBar: { isOpen: true },
        filters: { categories: { isOpen: false } },
        alert: { isOpen: false, type: "" as const, title: "", message: "" },
      },
    },
  });

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (displayName = "TestUser", photoURL = ""): RenderComponent => {
  const { container } = render(
    <Provider store={createStore(displayName, photoURL)}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );

  return { container };
};

describe("NavBar", () => {
  it("should render the header element", () => {
    renderComponent();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    renderComponent();

    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("should render the Home navigation link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Navigate to home page" })).toBeInTheDocument();
  });

  it("should render the Favorites navigation link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Navigate to favorites page" })).toBeInTheDocument();
  });

  it("should render the Games navigation link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Navigate to games page" })).toBeInTheDocument();
  });

  it("should render the logout button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });

  it("should render the user display name", () => {
    renderComponent("JohnDoe");

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
  });

  it("should render a placeholder avatar when photoURL is empty", () => {
    const { container } = renderComponent("TestUser", "");

    const avatars = container.querySelectorAll<HTMLImageElement>(".header-wrapper__avatar");
    expect(avatars).toHaveLength(1);
  });

  it("should render the user avatar when photoURL is provided", () => {
    const { container } = renderComponent("TestUser", "https://example.com/photo.jpg");

    const avatar = container.querySelector<HTMLImageElement>(".header-wrapper__avatar");
    expect(avatar).toHaveAttribute("src", "https://example.com/photo.jpg");
  });
});
