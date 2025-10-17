import { screen, render } from "@testing-library/react";

import { HeaderPresentation } from "@src/components/HeaderPresentation/HeaderPresentation";

type RenderComponent = {
  text: string;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const text = "text 1234";

  const { container } = render(<HeaderPresentation>{text}</HeaderPresentation>);

  return {
    text: text,
    container: container,
  };
};

describe("HeaderPresentation.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the presentation header.", () => {
      const { text } = renderComponent();

      const heading = screen.getByRole("heading", { name: text });

      expect(heading).toBeInTheDocument();
    });
  });
});
