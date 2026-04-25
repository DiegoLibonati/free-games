import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

const renderComponent = (): RenderResult => render(<Loader />);

describe("Loader", () => {
  describe("rendering", () => {
    it("should render the outer loader all wrapper", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
    });

    it("should render the inner loader all element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".loader-all")).toBeInTheDocument();
    });

    it("should render the inner element nested inside the wrapper", () => {
      const { container } = renderComponent();
      const wrapper = container.querySelector<HTMLDivElement>(".loader-all-wrapper");
      const inner = wrapper?.querySelector<HTMLDivElement>(".loader-all");
      expect(inner).toBeInTheDocument();
    });
  });
});
