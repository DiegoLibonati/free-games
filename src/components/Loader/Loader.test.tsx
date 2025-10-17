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

      const loaderRoot = container.querySelector(
        ".loader-all-wrapper"
      ) as HTMLDivElement;
      const loaderChild = loaderRoot!.querySelector(
        ".loader-all"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderChild).toBeInTheDocument();
    });
  });
});
