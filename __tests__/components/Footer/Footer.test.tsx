import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Footer from "@/components/Footer/Footer";

const renderComponent = (): RenderResult => render(<Footer />);

describe("Footer", () => {
  describe("rendering", () => {
    it("should render the footer element", () => {
      renderComponent();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render the Facebook profile link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Facebook profile" })).toBeInTheDocument();
    });

    it("should render the GitHub profile link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit GitHub profile" })).toBeInTheDocument();
    });

    it("should render the Instagram profile link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Instagram profile" })).toBeInTheDocument();
    });

    it("should render the LinkedIn profile link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit LinkedIn profile" })).toBeInTheDocument();
    });

    it("should render all four social links", () => {
      renderComponent();
      expect(screen.getAllByRole("link")).toHaveLength(4);
    });
  });

  describe("behavior", () => {
    it("should open Facebook link in a new tab", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Facebook profile" })).toHaveAttribute(
        "target",
        "_blank"
      );
    });

    it("should open GitHub link in a new tab", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit GitHub profile" })).toHaveAttribute(
        "target",
        "_blank"
      );
    });

    it("should have the correct href for the Facebook link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Facebook profile" })).toHaveAttribute(
        "href",
        "https://www.facebook.com/dielibonati/"
      );
    });

    it("should have the correct href for the GitHub link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit GitHub profile" })).toHaveAttribute(
        "href",
        "https://github.com/DiegoLibonati"
      );
    });

    it("should have the correct href for the Instagram link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Instagram profile" })).toHaveAttribute(
        "href",
        "https://www.instagram.com/die_libonati/"
      );
    });

    it("should have the correct href for the LinkedIn link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit LinkedIn profile" })).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/diego-libonati-67102419b/"
      );
    });

    it("should have rel noreferrer on all links", () => {
      renderComponent();
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("rel", "noreferrer");
      });
    });
  });
});
