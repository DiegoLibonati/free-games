import { screen, render } from "@testing-library/react";

import { Provider } from "react-redux";

import { ShowGamesSection } from "./ShowGamesSection";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { mockRequestGames } from "../../../../../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <ShowGamesSection></ShowGamesSection>
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

describe("ShowGamesSection.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (useGamesStore as jest.Mock).mockReturnValue({
        games: mockRequestGames,
      });
    });

    test("It must render the section title.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /Other Games/i });

      expect(heading).toBeInTheDocument();
    });

    test("It must render all games.", () => {
      renderComponent();

      const articles = screen.getAllByRole("article");
      const articleGames = articles.find((article) =>
        article.classList.contains("show-games__cards")
      );

      expect(articleGames).toBeInTheDocument();
      // eslint-disable-next-line
      expect(articleGames?.children).toHaveLength(
        mockRequestGames.length >= 12 ? 12 : mockRequestGames.length
      );
    });
  });
});
