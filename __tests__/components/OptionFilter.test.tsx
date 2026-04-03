import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { OptionFilterProps } from "@/types/props";

import OptionFilter from "@/components/OptionFilter/OptionFilter";

type RenderComponent = {
  container: HTMLElement;
  props: OptionFilterProps;
};

const renderComponent = (overrides?: Partial<OptionFilterProps>): RenderComponent => {
  const mockHandleClickFilter = jest.fn();
  const mockHandleClickOpenAndClose = jest.fn();

  const props: OptionFilterProps = {
    name: "Categories",
    isOpen: false,
    arr: ["MMORPG", "Strategy", "Shooter"],
    handleClickFilter: mockHandleClickFilter,
    handleClickOpenAndClose: mockHandleClickOpenAndClose,
    ...overrides,
  };

  const { container } = render(<OptionFilter {...props} />);

  return { container, props };
};

describe("OptionFilter", () => {
  it("should render the filter name", () => {
    renderComponent({ name: "Categories" });

    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("should render the open button when isOpen is false", () => {
    renderComponent({ isOpen: false });

    expect(screen.getByRole("button", { name: "Open category filter" })).toBeInTheDocument();
  });

  it("should render the close button when isOpen is true", () => {
    renderComponent({ isOpen: true });

    expect(screen.getByRole("button", { name: "Close category filter" })).toBeInTheDocument();
  });

  it("should not render list items when isOpen is false", () => {
    renderComponent({ isOpen: false, arr: ["MMORPG", "Strategy"] });

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should render list items when isOpen is true", () => {
    renderComponent({ isOpen: true, arr: ["MMORPG", "Strategy"] });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("should call handleClickOpenAndClose when the header is clicked", async () => {
    const mockHandleClickOpenAndClose = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleClickOpenAndClose: mockHandleClickOpenAndClose });

    await user.click(screen.getByText("Categories"));

    expect(mockHandleClickOpenAndClose).toHaveBeenCalledTimes(1);
  });

  it("should call handleClickFilter with the correct value when a list item is clicked", async () => {
    const mockHandleClickFilter = jest.fn();
    const user = userEvent.setup();

    renderComponent({ isOpen: true, arr: ["MMORPG"], handleClickFilter: mockHandleClickFilter });

    await user.click(screen.getByRole("listitem"));

    expect(mockHandleClickFilter).toHaveBeenCalledWith("MMORPG");
  });
});
