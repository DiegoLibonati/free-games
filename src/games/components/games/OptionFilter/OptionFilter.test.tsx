import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { OptionFilter } from "@src/games/components/games/OptionFilter/OptionFilter";

type RenderComponent = {
  props: {
    name: string;
    isOpen: boolean;
    arr: string[];
    mockHandleClickFilter: jest.Mock;
    mockHandleClickOpenAndClose: jest.Mock;
  };
  container: HTMLElement;
};

interface RenderComponentProps {
  isOpen: boolean;
}

const renderComponent = ({ isOpen }: RenderComponentProps): RenderComponent => {
  const props = {
    name: "1234",
    isOpen: isOpen,
    arr: ["12214", "245"],
    mockHandleClickFilter: jest.fn(),
    mockHandleClickOpenAndClose: jest.fn(),
  };

  const { container } = render(
    <OptionFilter
      name={props.name}
      isOpen={props.isOpen}
      arr={props.arr}
      handleClickFilter={props.mockHandleClickFilter}
      handleClickOpenAndClose={props.mockHandleClickOpenAndClose}
    ></OptionFilter>
  );

  return {
    props: props,
    container: container,
  };
};

describe("OptionFilter.tsx", () => {
  describe("If prop isOpen is true", () => {
    const isOpen = true;

    test("It must render the button to close the filter.", () => {
      renderComponent({ isOpen: isOpen });

      const btnClose = screen.getByRole("button", { name: /close filter/i });

      expect(btnClose).toBeInTheDocument();
    });

    test("It must render the filter list with all the options.", () => {
      const { props } = renderComponent({ isOpen: isOpen });

      const list = screen.getByRole("list");
      const listItems = screen.getAllByRole("listitem");

      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(props.arr.length);
    });
  });

  describe("If prop isOpen is false", () => {
    const isOpen = false;

    test("It must render the button to open the filter.", () => {
      renderComponent({ isOpen: isOpen });

      const btnOpen = screen.getByRole("button", { name: /open filter/i });

      expect(btnOpen).toBeInTheDocument();
    });
  });

  describe("General Tests.", () => {
    test("It must render the root of the filter.", () => {
      renderComponent({ isOpen: false });

      const article = screen.getByRole("article");

      expect(article).toBeInTheDocument();
      expect(article).toHaveClass("option-filter");
    });

    test("It must render the root of the filter header.", () => {
      const { container } = renderComponent({ isOpen: false });

      // eslint-disable-next-line
      const header = container.querySelector(
        ".option-filter__header"
      ) as HTMLDivElement;

      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("option-filter__header");
    });

    test("It should execute the relevant function when the header is clicked.", async () => {
      const { container, props } = renderComponent({ isOpen: false });

      // eslint-disable-next-line
      const header = container.querySelector(
        ".option-filter__header"
      ) as HTMLDivElement;

      expect(header).toBeInTheDocument();

      await user.click(header);

      expect(props.mockHandleClickOpenAndClose).toHaveBeenCalledTimes(1);
    });

    test("It must render the filter title", () => {
      const { props } = renderComponent({ isOpen: false });

      const title = screen.getByRole("heading", { name: props.name });

      expect(title).toBeInTheDocument();
    });
  });
});
