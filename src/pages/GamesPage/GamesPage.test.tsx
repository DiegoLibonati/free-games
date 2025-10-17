import { screen, render } from "@testing-library/react";

import { MemoryRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";

import { Game } from "@src/entities/app";

import { GamesPage } from "@src/pages/GamesPage/GamesPage";

import { useUiStore } from "@src/hooks/useUiStore";
import { useGamesStore } from "@src/hooks/useGamesStore";

import { store } from "@src/app/store";

import { mockRequestGames } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <GamesPage></GamesPage>
      </MemoryRouter>
    </Provider>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <GamesPage></GamesPage>
      </MemoryRouter>
    </Provider>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useGamesStore", () => ({
  ...jest.requireActual("@src/hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));
jest.mock("@src/hooks/useUiStore", () => ({
  ...jest.requireActual("@src/hooks/useUiStore"),
  useUiStore: jest.fn(),
}));

describe("GamesPage.tsx", () => {
  describe("If isLoadingGames is true.", () => {
    const mockHandleGetGamesByCategory = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const mockHandleOpenFilterCategories = jest.fn();
    const mockHandleCloseFilterCategories = jest.fn();

    const games: Game[] = [];
    const isLoadingGames = true;
    const categories: string[] = [];

    const isFilterCategoriesOpen = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: games,
        isLoadingGames: isLoadingGames,
        categories: categories,
        handleGetGamesByCategory: mockHandleGetGamesByCategory,
        handleSetToInitialState: mockHandleSetToInitialState,
      });

      (useUiStore as jest.Mock).mockReturnValue({
        isFilterCategoriesOpen: isFilterCategoriesOpen,
        handleOpenFilterCategories: mockHandleOpenFilterCategories,
        handleCloseFilterCategories: mockHandleCloseFilterCategories,
      });

      (useLocation as jest.Mock).mockReturnValue({ search: "" });
    });

    test("It must render the loader.", () => {
      const { container } = renderComponent();

      const loaderRoot = container.querySelector(
        ".loader-all-wrapper"
      ) as HTMLDivElement;
      const loaderChild = loaderRoot!.querySelector(
        ".loader-all"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderChild).toBeInTheDocument();
    });
  });

  describe("If isLoadingGames is false and there are not games.", () => {
    const mockHandleGetGamesByCategory = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const mockHandleOpenFilterCategories = jest.fn();
    const mockHandleCloseFilterCategories = jest.fn();

    const games: Game[] = [];
    const isLoadingGames = false;
    const categories: string[] = [];

    const isFilterCategoriesOpen = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: games,
        isLoadingGames: isLoadingGames,
        categories: categories,
        handleGetGamesByCategory: mockHandleGetGamesByCategory,
        handleSetToInitialState: mockHandleSetToInitialState,
      });

      (useUiStore as jest.Mock).mockReturnValue({
        isFilterCategoriesOpen: isFilterCategoriesOpen,
        handleOpenFilterCategories: mockHandleOpenFilterCategories,
        handleCloseFilterCategories: mockHandleCloseFilterCategories,
      });

      (useLocation as jest.Mock).mockReturnValue({ search: "" });
    });

    test("It should render the message that there are no games.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", {
        name: /¡That category does not exists!/i,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If isLoadingGames is false and there are games.", () => {
    const mockHandleGetGamesByCategory = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const mockHandleOpenFilterCategories = jest.fn();
    const mockHandleCloseFilterCategories = jest.fn();

    const games: Game[] = mockRequestGames;
    const isLoadingGames = false;
    const categories: string[] = [];

    const isFilterCategoriesOpen = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: games,
        isLoadingGames: isLoadingGames,
        categories: categories,
        handleGetGamesByCategory: mockHandleGetGamesByCategory,
        handleSetToInitialState: mockHandleSetToInitialState,
      });

      (useUiStore as jest.Mock).mockReturnValue({
        isFilterCategoriesOpen: isFilterCategoriesOpen,
        handleOpenFilterCategories: mockHandleOpenFilterCategories,
        handleCloseFilterCategories: mockHandleCloseFilterCategories,
      });

      (useLocation as jest.Mock).mockReturnValue({ search: "" });
    });

    test("It must render all games in favorites.", () => {
      renderComponent();

      const articles = screen.getAllByRole("article");
      const articleGameRoots = articles.filter((article) =>
        article.classList.contains("card-game-games")
      );

      expect(articleGameRoots).toHaveLength(games.length);
    });
  });

  describe("General Tests.", () => {
    const mockHandleGetGamesByCategory = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const mockHandleOpenFilterCategories = jest.fn();
    const mockHandleCloseFilterCategories = jest.fn();

    const games: Game[] = mockRequestGames;
    const isLoadingGames = false;
    const categories: string[] = [];

    const isFilterCategoriesOpen = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: games,
        isLoadingGames: isLoadingGames,
        categories: categories,
        handleGetGamesByCategory: mockHandleGetGamesByCategory,
        handleSetToInitialState: mockHandleSetToInitialState,
      });

      (useUiStore as jest.Mock).mockReturnValue({
        isFilterCategoriesOpen: isFilterCategoriesOpen,
        handleOpenFilterCategories: mockHandleOpenFilterCategories,
        handleCloseFilterCategories: mockHandleCloseFilterCategories,
      });

      (useLocation as jest.Mock).mockReturnValue({ search: "" });
    });

    test("It must render the navbar.", async () => {
      const { container } = await asyncRenderComponent();

      const header = container.querySelector(".header-wrapper") as HTMLElement;
      const nav = screen.getByRole("navigation");

      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
    });

    test("It must render the main.", async () => {
      await asyncRenderComponent();

      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument();
    });

    test("It must render the footer.", async () => {
      const { container } = await asyncRenderComponent();

      const footer = container.querySelector("footer") as HTMLElement;

      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("footer-wrapper");
    });
  });
});
