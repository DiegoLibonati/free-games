import { screen, render } from "@testing-library/react";

import { UpcomingGamesSection } from "@src/components/UpcomingGamesSection/UpcomingGamesSection";

import { upcomingGames } from "@src/constants/data";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<UpcomingGamesSection></UpcomingGamesSection>);

  return {
    container: container,
  };
};

describe("UpComingGamesSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the section title.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /Upcoming Games/i });

      expect(heading).toBeInTheDocument();
    });

    test("It must render all the games that are about to be released.", () => {
      renderComponent();

      const articles = screen.getAllByRole("article");
      const upcomingGamesRoots = articles.filter((article) =>
        article.classList.contains("upcoming-game")
      );

      expect(upcomingGamesRoots).toHaveLength(upcomingGames.length);
    });
  });
});
