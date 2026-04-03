import { render, screen } from "@testing-library/react";

import UpcomingGamesSection from "@/components/UpcomingGamesSection/UpcomingGamesSection";

import { upcomingGames } from "@/constants/data";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<UpcomingGamesSection />);
  return { container };
};

describe("UpcomingGamesSection", () => {
  it("should render the section element", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLElement>("section.upcoming-games")).toBeInTheDocument();
  });

  it("should render the Upcoming Games heading", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: "Upcoming Games" })).toBeInTheDocument();
  });

  it("should render the correct number of upcoming game articles", () => {
    renderComponent();

    expect(screen.getAllByRole("article")).toHaveLength(upcomingGames.length);
  });

  it("should render each game name", () => {
    renderComponent();

    upcomingGames.forEach((game) => {
      expect(screen.getByAltText(game.name)).toBeInTheDocument();
    });
  });
});
