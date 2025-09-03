import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { CardFavoriteGame } from "./CardFavoriteGame";

import { Game } from "../../../../entities/entities";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { mockRequestGames } from "../../../../../tests/jest.constants";

type RenderComponent = {
  props: {
    game: Game;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    game: mockRequestGames[0],
  };

  const { container } = render(
    <Provider store={store}>
      <CardFavoriteGame game={props.game}></CardFavoriteGame>
    </Provider>
  );

  return {
    props: props,
    container: container,
  };
};

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

describe("CardFavoriteGame.tsx", () => {
  describe("General Tests.", () => {
    const mockHandleSetActiveGame = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        handleSetActiveGame: mockHandleSetActiveGame,
      });
    });

    test("It must render the root of the card. In addition, you must click on it and execute the relevant functions.", async () => {
      const { props } = renderComponent();

      const articleRoot = screen.getByRole("article");

      expect(articleRoot).toBeInTheDocument();
      expect(articleRoot).toHaveClass("card-favorite-game");

      await user.click(articleRoot);

      expect(mockHandleSetActiveGame).toHaveBeenCalledTimes(1);
      expect(mockHandleSetActiveGame).toHaveBeenCalledWith(props.game);
    });

    test("It must render the image and the title of the game.", () => {
      const { props } = renderComponent();

      const img = screen.getByRole("img");
      const title = screen.getByRole("heading", { name: props.game.title });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", props.game.thumbnail);
      expect(img).toHaveAttribute("alt", props.game.title);
      expect(title).toBeInTheDocument();
    });
  });
});
