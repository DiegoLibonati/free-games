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

      const loaderRoot =
        container.querySelector<HTMLDivElement>(".loader-wrapper");
      const loaderAuth = loaderRoot!.querySelector<HTMLDivElement>(
        ".loader-wrapper__auth"
      );

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderAuth).toBeInTheDocument();
    });
  });
});
