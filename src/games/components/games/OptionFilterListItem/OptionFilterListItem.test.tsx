import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { OptionFilterListItem } from "@src/games/components/games/OptionFilterListItem/OptionFilterListItem";

type RenderComponent = {
  props: {
    filter: string;
    mockHandleClickFilter: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    filter: "1234",
    mockHandleClickFilter: jest.fn(),
  };

  const { container } = render(
    <OptionFilterListItem
      filter={props.filter}
      handleClickFilter={props.mockHandleClickFilter}
    ></OptionFilterListItem>
  );

  return {
    props: props,
    container: container,
  };
};

describe("OptionFilterListItem.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the element filter.", () => {
      renderComponent();

      const filter = screen.getByRole("listitem");

      expect(filter).toBeInTheDocument();
    });

    test("It must execute the relevant function when the filter is clicked.", async () => {
      const { props } = renderComponent();

      const filter = screen.getByRole("listitem");

      expect(filter).toBeInTheDocument();

      await user.click(filter);

      expect(props.mockHandleClickFilter).toHaveBeenCalledTimes(1);
      expect(props.mockHandleClickFilter).toHaveBeenCalledWith(props.filter);
    });
  });
});
