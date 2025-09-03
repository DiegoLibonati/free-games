import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { useLocation } from "react-router-dom";
import { Provider } from "react-redux";

import { ActiveGame } from "./ActiveGame";

import { useUiStore } from "../../../hooks/useUiStore";
import { useGamesStore } from "../../../hooks/useGamesStore";
import { store } from "../../../store/store";

import { mockRequestGames } from "../../../../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <ActiveGame />
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));
jest.mock("../../../hooks/useUiStore", () => ({
  ...jest.requireActual("../../../hooks/useUiStore"),
  useUiStore: jest.fn(),
}));

describe("ActiveGame.tsx", () => {
  describe("If pathname is favorite page.", () => {
    const game = mockRequestGames[0];

    const mockHandleOpenAlert = jest.fn();
    const mockHandleClearActiveGame = jest.fn();
    const mockHandleSetNewGameToFavorite = jest.fn();
    const mockHandleDeleteFavoriteGame = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useUiStore as jest.Mock).mockReturnValue({
        handleOpenAlert: mockHandleOpenAlert,
      });

      (useGamesStore as jest.Mock).mockReturnValue({
        activeGame: game,
        handleClearActiveGame: mockHandleClearActiveGame,
        handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
        handleDeleteFavoriteGame: mockHandleDeleteFavoriteGame,
      });

      (useLocation as jest.Mock).mockReturnValue({
        pathname: "/games/favorite",
      });
    });

    test("It must render the delete favorite game button. Additionally, when clicked it must execute the relevant functions.", async () => {
      renderComponent();

      const btnDelete = screen.getByRole("button", {
        name: /delete favorite game/i,
      });

      expect(btnDelete).toBeInTheDocument();

      await user.click(btnDelete);

      expect(mockHandleClearActiveGame).toHaveBeenCalledTimes(1);
      expect(mockHandleDeleteFavoriteGame).toHaveBeenCalledTimes(1);
      expect(mockHandleDeleteFavoriteGame).toHaveBeenCalledWith(game);
      expect(mockHandleOpenAlert).toHaveBeenCalledTimes(1);
      expect(mockHandleOpenAlert).toHaveBeenCalledWith({
        isOpen: true,
        title: "Favorite Game",
        message: "¡Game deleted from your favorites successfully!",
        type: "success",
      });
    });
  });

  describe("If pathname is games page.", () => {
    const game = mockRequestGames[0];

    const mockHandleOpenAlert = jest.fn();
    const mockHandleClearActiveGame = jest.fn();
    const mockHandleSetNewGameToFavorite = jest.fn();
    const mockHandleDeleteFavoriteGame = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useUiStore as jest.Mock).mockReturnValue({
        handleOpenAlert: mockHandleOpenAlert,
      });

      (useGamesStore as jest.Mock).mockReturnValue({
        activeGame: game,
        handleClearActiveGame: mockHandleClearActiveGame,
        handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
        handleDeleteFavoriteGame: mockHandleDeleteFavoriteGame,
      });

      (useLocation as jest.Mock).mockReturnValue({ pathname: "/games/games" });
    });

    test("It must render the save new favorite game button. Additionally, when clicked it must execute the relevant functions.", async () => {
      renderComponent();

      const btnSaveNewGame = screen.getByRole("button", {
        name: /save new game to favorite/i,
      });

      expect(btnSaveNewGame).toBeInTheDocument();

      await user.click(btnSaveNewGame);

      expect(mockHandleClearActiveGame).toHaveBeenCalledTimes(1);
      expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
      expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(game);
    });
  });

  describe("General Tests.", () => {
    const game = mockRequestGames[0];

    const mockHandleOpenAlert = jest.fn();
    const mockHandleClearActiveGame = jest.fn();
    const mockHandleSetNewGameToFavorite = jest.fn();
    const mockHandleDeleteFavoriteGame = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useUiStore as jest.Mock).mockReturnValue({
        handleOpenAlert: mockHandleOpenAlert,
      });

      (useGamesStore as jest.Mock).mockReturnValue({
        activeGame: game,
        handleClearActiveGame: mockHandleClearActiveGame,
        handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
        handleDeleteFavoriteGame: mockHandleDeleteFavoriteGame,
      });

      (useLocation as jest.Mock).mockReturnValue({
        pathname: "/games/favorite",
      });
    });

    test("It must render the game image, title, description, genre, platform, publisher, developer and release date.", () => {
      renderComponent();

      const title = screen.getByRole("heading", { name: game.title });
      const description = screen.getByText(game.short_description);
      const genre = screen.getByRole("heading", {
        name: `Gender: ${game.genre}`,
      });
      const platform = screen.getByRole("heading", {
        name: `Platform: ${game.platform}`,
      });
      const publisher = screen.getByRole("heading", {
        name: `Published by: ${game.publisher}`,
      });
      const developer = screen.getByRole("heading", {
        name: `Developed by: ${game.developer}`,
      });
      const releaseDate = screen.getByRole("heading", {
        name: `Release date: ${game.release_date}`,
      });

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(genre).toBeInTheDocument();
      expect(platform).toBeInTheDocument();
      expect(publisher).toBeInTheDocument();
      expect(developer).toBeInTheDocument();
      expect(releaseDate).toBeInTheDocument();
    });

    test("It must render the official website link and the close active game button. In addition, it must execute the relevant functions when said button is clicked.", async () => {
      renderComponent();

      const linkOfficialWebsite = screen.getByRole("link", {
        name: `official website ${game.title}`,
      });
      const btnCloseActiveGame = screen.getByRole("button", {
        name: /close active game/i,
      });

      expect(linkOfficialWebsite).toBeInTheDocument();
      expect(btnCloseActiveGame).toBeInTheDocument();

      await user.click(btnCloseActiveGame);

      expect(mockHandleClearActiveGame).toHaveBeenCalledTimes(1);
    });
  });
});
