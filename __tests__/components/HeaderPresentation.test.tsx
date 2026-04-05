import { render, screen } from "@testing-library/react";

import type { HeaderPresentationProps } from "@/types/props";

import HeaderPresentation from "@/components/HeaderPresentation/HeaderPresentation";

interface RenderComponent {
  container: HTMLElement;
  props: HeaderPresentationProps;
}

const renderComponent = (overrides?: Partial<HeaderPresentationProps>): RenderComponent => {
  const props: HeaderPresentationProps = {
    children: "Default title",
    ...overrides,
  };

  const { container } = render(<HeaderPresentation {...props} />);

  return { container, props };
};

describe("HeaderPresentation", () => {
  it("should render an h1 element", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render children text", () => {
    renderComponent({ children: "The best free games wiki" });

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The best free games wiki");
  });

  it("should apply the header-presentation class", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLHeadingElement>(".header-presentation")).toBeInTheDocument();
  });
});
