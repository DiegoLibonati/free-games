import { render, screen } from "@testing-library/react";

import type { UpcomingGameProps } from "@/types/props";

import UpcomingGame from "@/components/UpcomingGame/UpcomingGame";

interface RenderComponent {
  container: HTMLElement;
  props: UpcomingGameProps;
}

const renderComponent = (overrides?: Partial<UpcomingGameProps>): RenderComponent => {
  const props: UpcomingGameProps = {
    img: "https://example.com/game.jpg",
    name: "Party Animals",
    release_date: "2023",
    ...overrides,
  };

  const { container } = render(<UpcomingGame {...props} />);

  return { container, props };
};

describe("UpcomingGame", () => {
  it("should render an article element", () => {
    renderComponent();

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the game image with the correct src", () => {
    renderComponent({ img: "https://example.com/game.jpg" });

    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/game.jpg");
  });

  it("should render the image with the game name as alt text", () => {
    renderComponent({ name: "SpiderHeck" });

    expect(screen.getByAltText("SpiderHeck")).toBeInTheDocument();
  });

  it("should render the game name", () => {
    renderComponent({ name: "Everywhere" });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Everywhere");
  });

  it("should render the release date", () => {
    renderComponent({ release_date: "2023" });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2023");
  });
});
