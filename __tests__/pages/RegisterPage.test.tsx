import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import gamesSlice from "@/features/games/gamesSlice";
import uiSlice from "@/features/ui/uiSlice";

import RegisterPage from "@/pages/RegisterPage/RegisterPage";

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
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );

  return { container };
};

describe("RegisterPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.register-page")).toBeInTheDocument();
  });

  it("should render the username input", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByPlaceholderText("Your username")).toBeInTheDocument();
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

  it("should render the repeat password input", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByPlaceholderText("Repeat your password")).toBeInTheDocument();
  });

  it("should render the create account button", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
  });

  it("should render the link to the login page", () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("link", { name: "Go to login page" })).toHaveAttribute(
      "href",
      "/login"
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

    const img = await screen.findByAltText("registerimage");
    expect(img).toHaveAttribute("src", mockImages[0]);
  });

  it("should update the username input when typed", async () => {
    mockedGamesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    const user = userEvent.setup();
    renderPage();

    const usernameInput = screen.getByPlaceholderText("Your username");
    await user.type(usernameInput, "johndoe");

    expect(usernameInput).toHaveValue("johndoe");
  });
});
