import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { OptionFilterListItemProps } from "@/types/props";

import OptionFilterListItem from "@/components/OptionFilterListItem/OptionFilterListItem";

type RenderComponent = {
  container: HTMLElement;
  props: OptionFilterListItemProps;
};

const renderComponent = (overrides?: Partial<OptionFilterListItemProps>): RenderComponent => {
  const handleClickFilter = jest.fn();

  const props: OptionFilterListItemProps = {
    filter: "MMORPG",
    handleClickFilter,
    ...overrides,
  };

  const { container } = render(
    <ul>
      <OptionFilterListItem {...props} />
    </ul>
  );

  return { container, props };
};

describe("OptionFilterListItem", () => {
  it("should render the filter text", () => {
    renderComponent({ filter: "Strategy" });

    expect(screen.getByRole("listitem")).toHaveTextContent("Strategy");
  });

  it("should call handleClickFilter with the filter value when clicked", async () => {
    const handleClickFilter = jest.fn();
    const user = userEvent.setup();

    renderComponent({ filter: "MMORPG", handleClickFilter });

    await user.click(screen.getByRole("listitem"));

    expect(handleClickFilter).toHaveBeenCalledWith("MMORPG");
  });

  it("should call handleClickFilter exactly once per click", async () => {
    const handleClickFilter = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleClickFilter });

    await user.click(screen.getByRole("listitem"));

    expect(handleClickFilter).toHaveBeenCalledTimes(1);
  });
});
