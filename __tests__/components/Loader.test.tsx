import { render } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);
  return { container };
};

describe("Loader", () => {
  it("should render the loader wrapper", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should render the spinner inside the wrapper", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".loader-all")).toBeInTheDocument();
  });
});
