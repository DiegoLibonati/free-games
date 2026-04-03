import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { OptionFilterListItemProps } from "@/types/props";

import OptionFilterListItem from "@/components/OptionFilterListItem/OptionFilterListItem";

type RenderComponent = {
  container: HTMLElement;
  props: OptionFilterListItemProps;
};

const renderComponent = (overrides?: Partial<OptionFilterListItemProps>): RenderComponent => {
  const mockHandleClickFilter = jest.fn();

  const props: OptionFilterListItemProps = {
    filter: "MMORPG",
    handleClickFilter: mockHandleClickFilter,
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
    const mockHandleClickFilter = jest.fn();
    const user = userEvent.setup();

    renderComponent({ filter: "MMORPG", handleClickFilter: mockHandleClickFilter });

    await user.click(screen.getByRole("listitem"));

    expect(mockHandleClickFilter).toHaveBeenCalledWith("MMORPG");
  });

  it("should call handleClickFilter exactly once per click", async () => {
    const mockHandleClickFilter = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleClickFilter: mockHandleClickFilter });

    await user.click(screen.getByRole("listitem"));

    expect(mockHandleClickFilter).toHaveBeenCalledTimes(1);
  });
});
