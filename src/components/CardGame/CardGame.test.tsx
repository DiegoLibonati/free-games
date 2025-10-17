import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { CardGame } from "@src/components/CardGame/CardGame";

import { CardGameProps } from "@src/entities/props";

import { useGamesStore } from "@src/hooks/useGamesStore";

import { store } from "@src/app/store";

import { mockRequestGames } from "@tests/jest.constants";

type RenderComponent = {
  props: CardGameProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    game: mockRequestGames[0],
  };

  const { container } = render(
    <Provider store={store}>
      <CardGame game={props.game}></CardGame>
    </Provider>
  );

  return {
    props: props,
    container: container,
  };
};

jest.mock("@src/hooks/useGamesStore", () => ({
  ...jest.requireActual("@src/hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

describe("CardGame.tsx", () => {
  describe("General Tests.", () => {
    const mockHandleSetActiveGame = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        handleSetActiveGame: mockHandleSetActiveGame,
      });
    });

    test("It must render the root of the card.", () => {
      renderComponent();

      const root = screen.getByRole("article");

      expect(root).toBeInTheDocument();
      expect(root).toHaveClass("card-game-games");
    });

    test("It must execute the relevant functions when the card is clicked.", async () => {
      const { props } = renderComponent();

      const root = screen.getByRole("article");

      expect(root).toBeInTheDocument();

      await user.click(root);

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
