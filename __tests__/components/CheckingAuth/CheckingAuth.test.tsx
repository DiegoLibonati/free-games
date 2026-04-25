import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import CheckingAuth from "@/components/CheckingAuth/CheckingAuth";

const renderComponent = (): RenderResult => render(<CheckingAuth />);

describe("CheckingAuth", () => {
  describe("rendering", () => {
    it("should render the outer loader wrapper", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".loader-wrapper")).toBeInTheDocument();
    });

    it("should render the inner auth loader element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".loader-wrapper__auth")).toBeInTheDocument();
    });

    it("should render the inner auth element nested inside the wrapper", () => {
      const { container } = renderComponent();
      const wrapper = container.querySelector<HTMLDivElement>(".loader-wrapper");
      const inner = wrapper?.querySelector<HTMLDivElement>(".loader-wrapper__auth");
      expect(inner).toBeInTheDocument();
    });
  });
});
