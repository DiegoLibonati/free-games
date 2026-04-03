import { render, screen } from "@testing-library/react";

import Footer from "@/components/Footer/Footer";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Footer />);
  return { container };
};

describe("Footer", () => {
  it("should render the footer element", () => {
    renderComponent();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should render the Facebook link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Visit Facebook profile" })).toBeInTheDocument();
  });

  it("should render the GitHub link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Visit GitHub profile" })).toBeInTheDocument();
  });

  it("should render the Instagram link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Visit Instagram profile" })).toBeInTheDocument();
  });

  it("should render the LinkedIn link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Visit LinkedIn profile" })).toBeInTheDocument();
  });

  it("should open all social links in a new tab", () => {
    renderComponent();

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });
});
