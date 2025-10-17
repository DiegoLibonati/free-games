import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { HomeCard } from "@src/components/HomeCard/HomeCard";

import { useGamesStore } from "@src/hooks/useGamesStore";

import { store } from "@src/app/store";

import { mockRequestGames } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <HomeCard></HomeCard>
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useGamesStore", () => ({
  ...jest.requireActual("@src/hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

describe("HomeCard.tsx", () => {
  describe("If game is not loading.", () => {
    const mockHandleSetNewGameToFavorite = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: [],
        handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
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

    test("It must render the root with the corresponding class.", () => {
      renderComponent();

      const article = screen.getByRole("article");

      expect(article).toBeInTheDocument();
      expect(article).toHaveClass("home-card home-card--effect-load");
    });
  });

  describe("If game is loading.", () => {
    const mockHandleSetNewGameToFavorite = jest.fn();

    const game = mockRequestGames[0];

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: [game],
        handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
      });
    });

    test("It must render the game image.", () => {
      renderComponent();

      const img = screen.getByRole("img");

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", game.thumbnail);
      expect(img).toHaveAttribute("alt", game.title);
    });

    test("It must render the title, genre and publisher.", () => {
      renderComponent();

      const title = screen.getByRole("heading", { name: game.title });
      const genre = screen.getByRole("heading", { name: game.genre });
      const publisher = screen.getByRole("heading", { name: game.publisher });

      expect(title).toBeInTheDocument();
      expect(genre).toBeInTheDocument();
      expect(publisher).toBeInTheDocument();
    });

    test("It must render the add to favorite button. It must also execute the relevant functions when clicked.", async () => {
      renderComponent();

      const btnFavorite = screen.getByRole("button", {
        name: /add to favorite/i,
      });

      expect(btnFavorite).toBeInTheDocument();

      await user.click(btnFavorite);

      expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
      expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(game);
    });
  });
});
