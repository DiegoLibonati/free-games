import { render } from "@testing-library/react";

import { Loader } from "@src/components/Loader/Loader";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);

  return {
    container: container,
  };
};

describe("Loader.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the loader.", () => {
      const { container } = renderComponent();

      const loaderRoot = container.querySelector<HTMLDivElement>(
        ".loader-all-wrapper"
      );
      const loaderChild =
        loaderRoot!.querySelector<HTMLDivElement>(".loader-all");

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderChild).toBeInTheDocument();
    });
  });
});
