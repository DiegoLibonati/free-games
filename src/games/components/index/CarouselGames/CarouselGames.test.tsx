import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Game } from "@src/entities/entities";

import { Provider } from "react-redux";

import { CarouselGames } from "@src/games/components/index/CarouselGames/CarouselGames";

import { useGamesStore } from "@src/hooks/useGamesStore";
import { store } from "@src/store/store";

import { mockRequestGames } from "@tests/jest.constants";

type RenderComponent = {
  props: { name: string; games: Game[] };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    name: "pepe",
    games: mockRequestGames,
  };

  const { container } = render(
    <Provider store={store}>
      <CarouselGames games={props.games} name={props.name}></CarouselGames>
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

describe("CarouselGames.tsx", () => {
  describe("General Tests.", () => {
    const mockHandleSetNewGameToFavorite = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
      });
    });

    test("It must render the root of the carousel with the corresponding class.", () => {
      renderComponent();

      const article = screen.getByRole("article");

      expect(article).toBeInTheDocument();
      expect(article).toHaveClass("carousel-games");
    });

    test("It must render the carousel title.", () => {
      const { props } = renderComponent();

      const heading = screen.getByRole("heading", { name: props.name });

      expect(heading).toBeInTheDocument();
    });

    test("It must render the carousel track with its respective class.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const track = container.querySelector(
        ".carousel-games__track"
      ) as HTMLDivElement;

      expect(track).toBeInTheDocument();
      expect(track).toHaveClass("carousel-games__track");
    });

    test("It must render the root of the card, with its image and button. Additionally, it must execute the relevant function when it is clicked.", async () => {
      const { props, container } = renderComponent();

      for (const game of props.games) {
        // eslint-disable-next-line
        const track = container.querySelector(
          `.game-${game.id}`
        ) as HTMLDivElement;
        const img = screen.getByAltText(game.title);
        const btnAddToFav = screen.getByRole("button", {
          name: `add game to fav ${game.title}`,
        });

        expect(track).toBeInTheDocument();
        expect(track).toHaveClass("carousel-games__item");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", game.thumbnail);
        expect(img).toHaveAttribute("alt", game.title);
        expect(btnAddToFav).toBeInTheDocument();
        expect(btnAddToFav).toHaveClass("carousel-games__btn-favorite");

        await user.click(btnAddToFav);

        expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
        expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(game);

        jest.clearAllMocks();
      }
    });
  });
});
