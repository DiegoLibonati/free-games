import { screen, render } from "@testing-library/react";

import { SlideButtonList } from "./SlideButtonList";

import { mockSlideImagesAuth } from "../../../../tests/jest.constants";

type RenderComponent = {
  props: { index: number; handleSetIndex: jest.Mock };
  container: HTMLElement;
};

interface RenderComponentProps {
  index: number;
}

const renderComponent = ({ index }: RenderComponentProps): RenderComponent => {
  const props = {
    index: index,
    handleSetIndex: jest.fn(),
  };

  const { container } = render(
    <SlideButtonList
      index={props.index}
      handleSetIndex={props.handleSetIndex}
    />
  );

  return {
    props: props,
    container: container,
  };
};

describe("SlideButtonList.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the root of the slide buttons.", () => {
      const { container } = renderComponent({ index: 0 });

      // eslint-disable-next-line
      const root = container.querySelector(".slide-button-list") as HTMLDivElement;

      expect(root).toBeInTheDocument();
    });

    test("It must render all the buttons.", () => {
      renderComponent({ index: 0 });

      const keys = Object.keys(mockSlideImagesAuth);

      for (const key of keys) {
        const btn = screen.getByRole("button", { name: `item-${key}` });

        expect(btn).toBeInTheDocument();
        expect(btn).toHaveClass("slide-button-list__btn");
      }
    });

    test("Only button 0 must be active.", () => {
      renderComponent({ index: 0 });

      const keys = Object.keys(mockSlideImagesAuth);

      for (const key of keys) {
        const btn = screen.getByRole("button", { name: `item-${key}` });

        expect(btn).toBeInTheDocument();
        expect(btn).toHaveClass(
          key === "0" ? "slide-button-list__btn slide-button-list__btn--active" : "slide-button-list__btn"
        );
      }
    });
  });
});
