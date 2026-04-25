import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import UpcomingGame from "@/components/UpcomingGame/UpcomingGame";

interface RenderOptions {
  img?: string;
  name?: string;
  release_date?: string;
}

const renderComponent = ({
  img = "https://example.com/game.jpg",
  name = "Test Game",
  release_date = "2025-01-15",
}: RenderOptions = {}): RenderResult =>
  render(<UpcomingGame img={img} name={name} release_date={release_date} />);

describe("UpcomingGame", () => {
  describe("rendering", () => {
    it("should render the article element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>("article.upcoming-game")).toBeInTheDocument();
    });

    it("should render the game image with the correct src", () => {
      renderComponent({ img: "https://example.com/cover.jpg", name: "Cover Game" });
      expect(screen.getByAltText("Cover Game")).toHaveAttribute(
        "src",
        "https://example.com/cover.jpg"
      );
    });

    it("should render the image with the correct alt text", () => {
      renderComponent({ name: "Epic Adventure" });
      expect(screen.getByAltText("Epic Adventure")).toBeInTheDocument();
    });

    it("should render the game name in the heading", () => {
      renderComponent({ name: "Dragon Quest" });
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Dragon Quest");
    });

    it("should render the release date in the heading", () => {
      renderComponent({ release_date: "2025-06-20" });
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2025-06-20");
    });
  });

  describe("edge cases", () => {
    it("should render with all props supplied correctly", () => {
      renderComponent({
        img: "https://example.com/img.png",
        name: "Full Props Game",
        release_date: "2026-03-01",
      });
      expect(screen.getByAltText("Full Props Game")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Full Props Game");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("2026-03-01");
    });
  });
});
