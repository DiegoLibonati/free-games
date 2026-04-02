import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { OptionFilterProps } from "@/types/props";

import OptionFilter from "@/components/OptionFilter/OptionFilter";

type RenderComponent = {
  container: HTMLElement;
  props: OptionFilterProps;
};

const renderComponent = (overrides?: Partial<OptionFilterProps>): RenderComponent => {
  const handleClickFilter = jest.fn();
  const handleClickOpenAndClose = jest.fn();

  const props: OptionFilterProps = {
    name: "Categories",
    isOpen: false,
    arr: ["MMORPG", "Strategy", "Shooter"],
    handleClickFilter,
    handleClickOpenAndClose,
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
    const handleClickOpenAndClose = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleClickOpenAndClose });

    await user.click(screen.getByText("Categories"));

    expect(handleClickOpenAndClose).toHaveBeenCalledTimes(1);
  });

  it("should call handleClickFilter with the correct value when a list item is clicked", async () => {
    const handleClickFilter = jest.fn();
    const user = userEvent.setup();

    renderComponent({ isOpen: true, arr: ["MMORPG"], handleClickFilter });

    await user.click(screen.getByRole("listitem"));

    expect(handleClickFilter).toHaveBeenCalledWith("MMORPG");
  });
});
