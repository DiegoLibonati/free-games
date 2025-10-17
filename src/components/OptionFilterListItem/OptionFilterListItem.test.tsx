import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { OptionFilterListItemProps } from "@src/entities/props";

import { OptionFilterListItem } from "@src/components/OptionFilterListItem/OptionFilterListItem";

type RenderComponent = {
  props: { handleClickFilter: jest.Mock } & OptionFilterListItemProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    filter: "1234",
    handleClickFilter: jest.fn(),
  };

  const { container } = render(
    <OptionFilterListItem
      filter={props.filter}
      handleClickFilter={props.handleClickFilter}
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

      expect(props.handleClickFilter).toHaveBeenCalledTimes(1);
      expect(props.handleClickFilter).toHaveBeenCalledWith(props.filter);
    });
  });
});
