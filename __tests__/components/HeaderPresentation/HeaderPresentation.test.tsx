import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import HeaderPresentation from "@/components/HeaderPresentation/HeaderPresentation";

interface RenderOptions {
  children?: React.ReactNode;
}

const renderComponent = ({ children = "Test Title" }: RenderOptions = {}): RenderResult =>
  render(<HeaderPresentation>{children}</HeaderPresentation>);

describe("HeaderPresentation", () => {
  describe("rendering", () => {
    it("should render the heading element", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("should render the provided text content", () => {
      renderComponent({ children: "Welcome to Free Games" });
      expect(screen.getByText("Welcome to Free Games")).toBeInTheDocument();
    });

    it("should apply the header-presentation class", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toHaveClass("header-presentation");
    });
  });

  describe("edge cases", () => {
    it("should render without children", () => {
      renderComponent({ children: undefined });
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("should render nested React elements as children", () => {
      renderComponent({ children: <span>Nested</span> });
      expect(screen.getByText("Nested")).toBeInTheDocument();
    });
  });
});
