import { render } from "@testing-library/react";

import { CheckingAuth } from "@src/auth/components/CheckingAuth/CheckingAuth";

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

      // eslint-disable-next-line
      const loaderRoot = container.querySelector(
        ".loader-wrapper"
      ) as HTMLDivElement;
      // eslint-disable-next-line
      const loaderAuth = loaderRoot!.querySelector(
        ".loader-wrapper__auth"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderAuth).toBeInTheDocument();
    });
  });
});
