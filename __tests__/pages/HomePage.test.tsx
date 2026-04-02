import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HomePage from "@/pages/HomePage/HomePage";

import { useGamesStore } from "@/hooks/useGamesStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useUiStore } from "@/hooks/useUiStore";
import { useAutoSlide } from "@/hooks/useAutoSlide";

import { mockGames } from "@tests/__mocks__/games.mock";

jest.mock("@/hooks/useGamesStore", () => ({ useGamesStore: jest.fn() }));
jest.mock("@/hooks/useAuthStore", () => ({ useAuthStore: jest.fn() }));
jest.mock("@/hooks/useUiStore", () => ({ useUiStore: jest.fn() }));
jest.mock("@/hooks/useAutoSlide", () => ({ useAutoSlide: jest.fn() }));

const mockHandleGetGames = jest.fn();
const mockHandleSetToInitialState = jest.fn();

type RenderPage = { container: HTMLElement };

const renderPage = (games = mockGames): RenderPage => {
  (useGamesStore as jest.Mock).mockReturnValue({
    games,
    categories: [],
    handleGetGames: mockHandleGetGames,
    handleSetToInitialState: mockHandleSetToInitialState,
    handleSetNewGameToFavorite: jest.fn(),
    handleSetActiveGame: jest.fn(),
  });

  (useAuthStore as jest.Mock).mockReturnValue({
    displayName: "Test",
    photoURL: "",
    handleLogOut: jest.fn(),
  });

  (useUiStore as jest.Mock).mockReturnValue({
    isNavBarOpen: false,
    handleOpenNavBar: jest.fn(),
    handleCloseNavBar: jest.fn(),
  });

  (useAutoSlide as jest.Mock).mockReturnValue(0);

  const { container } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  return { container };
};

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-home-page")).toBeInTheDocument();
  });

  it("should render the Upcoming Games section", () => {
    renderPage();

    expect(screen.getByText("Upcoming Games")).toBeInTheDocument();
  });

  it("should render the Other Games section heading", () => {
    renderPage();

    expect(screen.getByText("Other Games")).toBeInTheDocument();
  });

  it("should render the footer", () => {
    renderPage();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should render the navbar", () => {
    renderPage();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should call handleGetGames on mount", () => {
    renderPage();

    expect(mockHandleGetGames).toHaveBeenCalledTimes(1);
  });
});
