import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import LoginPage from "@/pages/LoginPage/LoginPage";

import { gamesService } from "@/services/gamesService";

import { mockGames } from "@tests/__mocks__/games.mock";
import { mockImages } from "@tests/__mocks__/images.mock";

jest.mock("@/services/gamesService");

const mockedGamesService = gamesService as jest.Mocked<typeof gamesService>;

const createStore = (images: string[] = [], isLoadingImages = false) =>
  configureStore({
    reducer: { auth: authSlice, games: gamesSlice, ui: uiSlice },
    preloadedState: {
      auth: {
        images: { images, isLoadingImages },
        auth: { isChecking: false, status: "not-authenticated" as const, errorMessage: "" },
        user: { uid: "", email: "", displayName: "", photoURL: "" },
      },
    },
  });

type RenderPage = {
  container: HTMLElement;
};

const renderPage = (images: string[] = [], isLoadingImages = false): RenderPage => {
  const { container } = render(
    <Provider store={createStore(images, isLoadingImages)}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  return { container };
};

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-login")).toBeInTheDocument();
  });

  it("should render the email input", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
  });

  it("should render the password input", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
  });

  it("should render the sign-in button", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should render the sign-in with Google button", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
  });

  it("should render the link to the register page", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("link", { name: "Go to register page" })).toHaveAttribute(
      "href",
      "/register"
    );
  });

  it("should show loader while images are loading", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage([], true);

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show the slide image when images are loaded", async () => {
    mockedGamesService.getAll.mockResolvedValueOnce(mockGames);

    renderPage(mockImages, false);

    const img = await screen.findByAltText("loginimage");
    expect(img).toHaveAttribute("src", mockImages[0]);
  });

  it("should update the email input when typed", async () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const user = userEvent.setup();
    renderPage();

    const emailInput = screen.getByPlaceholderText("Your email");
    await user.type(emailInput, "user@test.com");

    expect(emailInput).toHaveValue("user@test.com");
  });

  it("should call gamesService.getAll on mount to fetch images", async () => {
    mockedGamesService.getAll.mockResolvedValueOnce(mockGames);

    renderPage();

    await screen.findByAltText("loginimage");

    expect(mockedGamesService.getAll).toHaveBeenCalledTimes(1);
  });
});
