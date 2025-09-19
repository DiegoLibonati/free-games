import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";

import { CarouselsGamesSection } from "@src/games/components/index/CarouselsGamesSection/CarouselsGamesSection";

import { useGamesStore } from "@src/hooks/useGamesStore";
import { store } from "@src/store/store";
import { gamesApi } from "@src/api/gamesApi";

import { mockRequestGames } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const categoryName = "MMORPG";

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <CarouselsGamesSection></CarouselsGamesSection>
    </Provider>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <Provider store={store}>
      <CarouselsGamesSection></CarouselsGamesSection>
    </Provider>
  );

  await screen.findByRole("heading", { name: categoryName });

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useGamesStore", () => ({
  ...jest.requireActual("@src/hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

describe("CarouselsGamesSection.tsx", () => {
  describe("General Tests.", () => {
    const mock = new MockAdapter(gamesApi);

    mock
      .onGet(`/api/games?category=${categoryName}`, { params: { id: "452" } })
      .reply(200, mockRequestGames);

    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        categories: [categoryName],
      });
    });

    test("It must render the loader when you have not yet obtained the games of a category.", async () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const loaderRoot = container.querySelector(
        ".loader-all-wrapper"
      ) as HTMLDivElement;
      // eslint-disable-next-line
      const loaderParent = loaderRoot.parentElement as HTMLElement;
      // eslint-disable-next-line
      const loaderChild = loaderRoot!.querySelector(
        ".loader-all"
      ) as HTMLDivElement;

      expect(loaderParent).toBeInTheDocument();
      expect(loaderParent).toHaveClass("carousel-games");
      expect(loaderRoot).toBeInTheDocument();
      expect(loaderChild).toBeInTheDocument();

      await screen.findByRole("heading", { name: categoryName });
    });

    test("It must render the carousel with the games obtained by the request.", async () => {
      const { container } = await asyncRenderComponent();

      const headingCategory = screen.getByRole("heading", {
        name: categoryName,
      });

      expect(headingCategory).toBeInTheDocument();

      for (const game of mockRequestGames) {
        // eslint-disable-next-line
        const rootCard = container.querySelector(
          `.game-${game.id}`
        ) as HTMLDivElement;
        const imgGame = screen.getByAltText(game.title);
        const btnAddToFav = screen.getByRole("button", {
          name: `add game to fav ${game.title}`,
        });

        expect(rootCard).toBeInTheDocument();
        expect(imgGame).toBeInTheDocument();
        expect(imgGame).toHaveAttribute("src", game.thumbnail);
        expect(imgGame).toHaveAttribute("alt", game.title);
        expect(btnAddToFav).toBeInTheDocument();
      }
    });
  });
});
