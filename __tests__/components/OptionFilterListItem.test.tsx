import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { OptionFilterListItemProps } from "@/types/props";

import OptionFilterListItem from "@/components/OptionFilterListItem/OptionFilterListItem";

interface RenderComponent {
  container: HTMLElement;
  props: OptionFilterListItemProps;
}

const mockHandleClickFilter = jest.fn();

const renderComponent = (overrides?: Partial<OptionFilterListItemProps>): RenderComponent => {
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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the filter text", () => {
    renderComponent({ filter: "Strategy" });

    expect(screen.getByRole("listitem")).toHaveTextContent("Strategy");
  });

  it("should call handleClickFilter with the filter value when clicked", async () => {
    const user = userEvent.setup();

    renderComponent({ filter: "MMORPG" });

    await user.click(screen.getByRole("listitem"));

    expect(mockHandleClickFilter).toHaveBeenCalledWith("MMORPG");
  });

  it("should call handleClickFilter exactly once per click", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("listitem"));

    expect(mockHandleClickFilter).toHaveBeenCalledTimes(1);
  });
});
