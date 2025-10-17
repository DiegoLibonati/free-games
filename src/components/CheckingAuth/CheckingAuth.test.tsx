import { render } from "@testing-library/react";

import { CheckingAuth } from "@src/components/CheckingAuth/CheckingAuth";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<CheckingAuth />);

  return {
    container: container,
  };
};

describe("CheckingAuth.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the auth loader.", () => {
      const { container } = renderComponent();

      const loaderRoot = container.querySelector(
        ".loader-wrapper"
      ) as HTMLDivElement;
      const loaderAuth = loaderRoot!.querySelector(
        ".loader-wrapper__auth"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderAuth).toBeInTheDocument();
    });
  });
});
