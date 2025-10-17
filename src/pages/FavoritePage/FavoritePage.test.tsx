import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Game } from "@src/entities/app";

import { FavoritePage } from "@src/pages/FavoritePage/FavoritePage";

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
        <FavoritePage></FavoritePage>
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
        <FavoritePage></FavoritePage>
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

describe("FavoritePage.tsx", () => {
  describe("If key 'isLoadingFavoriteGames' is true", () => {
    const mockHandleGetFavoriteGames = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const favoritesGames: Game[] = [];
    const isLoadingFavoritesGames = true;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        favoritesGames: favoritesGames,
        isLoadingFavoritesGames: isLoadingFavoritesGames,
        handleGetFavoriteGames: mockHandleGetFavoriteGames,
        handleSetToInitialState: mockHandleSetToInitialState,
      });
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

  describe("If key 'isLoadingFavoriteGames' is false and there are not favorite games.", () => {
    const mockHandleGetFavoriteGames = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const favoritesGames: Game[] = [];
    const isLoadingFavoritesGames = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        favoritesGames: favoritesGames,
        isLoadingFavoritesGames: isLoadingFavoritesGames,
        handleGetFavoriteGames: mockHandleGetFavoriteGames,
        handleSetToInitialState: mockHandleSetToInitialState,
      });
    });

    test("It should render the message that there are no games in favorites.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", {
        name: /Add a game to your favorites list/i,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If key 'isLoadingFavoriteGames' is false and there are favorite games.", () => {
    const mockHandleGetFavoriteGames = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const favoritesGames: Game[] = mockRequestGames;
    const isLoadingFavoritesGames = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        favoritesGames: favoritesGames,
        isLoadingFavoritesGames: isLoadingFavoritesGames,
        handleGetFavoriteGames: mockHandleGetFavoriteGames,
        handleSetToInitialState: mockHandleSetToInitialState,
      });
    });

    test("It must render all games in favorites.", () => {
      renderComponent();

      const articles = screen.getAllByRole("article");
      const articleFavoriteGameRoots = articles.filter((article) =>
        article.classList.contains("card-favorite-game")
      );

      expect(articleFavoriteGameRoots).toHaveLength(favoritesGames.length);
    });
  });

  describe("General Tests.", () => {
    const mockHandleGetFavoriteGames = jest.fn();
    const mockHandleSetToInitialState = jest.fn();

    const favoritesGames: Game[] = mockRequestGames;
    const isLoadingFavoritesGames = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        favoritesGames: favoritesGames,
        isLoadingFavoritesGames: isLoadingFavoritesGames,
        handleGetFavoriteGames: mockHandleGetFavoriteGames,
        handleSetToInitialState: mockHandleSetToInitialState,
      });
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
