import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { IndexPage } from "@src/pages/IndexPage/IndexPage";

import { gamesApi } from "@src/api/games";

import { store } from "@src/app/store";

import { mockRequestGames } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <IndexPage></IndexPage>
      </MemoryRouter>
    </Provider>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

describe("IndexPage.tsx", () => {
  describe("General Tests.", () => {
    const mock = new MockAdapter(gamesApi);
    const categoryName = "1234";
    const firstGame = mockRequestGames[0];

    mock
      .onGet("/api/games", { params: { id: "452" } })
      .reply(200, mockRequestGames);

    mock
      .onGet(`/api/games?category=${categoryName}`, { params: { id: "452" } })
      .reply(200, [firstGame]);

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

    test("It must render the 'HomeImagesSection' section.", async () => {
      const { container } = await asyncRenderComponent();

      const homeImagesSection = container.querySelector(
        ".home-images"
      ) as HTMLElement;

      expect(homeImagesSection).toBeInTheDocument();
    });

    test("It must render the 'CarouselsGamesSection' section.", async () => {
      const { container } = await asyncRenderComponent();

      const carouselsGamesSection = container.querySelector(
        ".carousels"
      ) as HTMLElement;

      expect(carouselsGamesSection).toBeInTheDocument();
    });

    test("It must render the 'ShowGamesSection' section.", async () => {
      const { container } = await asyncRenderComponent();

      const showGamesSection = container.querySelector(
        ".show-games"
      ) as HTMLElement;

      expect(showGamesSection).toBeInTheDocument();
    });

    test("It must render the 'UpcomingGamesSection' section.", async () => {
      const { container } = await asyncRenderComponent();

      const upcomingGamesSection = container.querySelector(
        ".upcoming-games"
      ) as HTMLElement;

      expect(upcomingGamesSection).toBeInTheDocument();
    });

    test("It must render the footer.", async () => {
      const { container } = await asyncRenderComponent();

      const footer = container.querySelector("footer") as HTMLElement;

      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("footer-wrapper");
    });
  });
});
