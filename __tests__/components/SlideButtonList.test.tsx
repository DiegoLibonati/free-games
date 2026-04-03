import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { SlideButtonListProps } from "@/types/props";

import SlideButtonList from "@/components/SlideButtonList/SlideButtonList";

type RenderComponent = {
  container: HTMLElement;
  props: SlideButtonListProps;
};

const renderComponent = (overrides?: Partial<SlideButtonListProps>): RenderComponent => {
  const mockHandleSetIndex = jest.fn();

  const props: SlideButtonListProps = {
    index: 0,
    handleSetIndex: mockHandleSetIndex,
    ...overrides,
  };

  const { container } = render(<SlideButtonList {...props} />);

  return { container, props };
};

describe("SlideButtonList", () => {
  it("should render 3 buttons", () => {
    renderComponent();

    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should mark the first button as active when index is 0", () => {
    const { container } = renderComponent({ index: 0 });
    const buttons = container.querySelectorAll<HTMLButtonElement>(".slide-button-list__btn");

    expect(buttons[0]).toHaveClass("slide-button-list__btn--active");
    expect(buttons[1]).not.toHaveClass("slide-button-list__btn--active");
    expect(buttons[2]).not.toHaveClass("slide-button-list__btn--active");
  });

  it("should mark the second button as active when index is 1", () => {
    const { container } = renderComponent({ index: 1 });
    const buttons = container.querySelectorAll<HTMLButtonElement>(".slide-button-list__btn");

    expect(buttons[1]).toHaveClass("slide-button-list__btn--active");
  });

  it("should call handleSetIndex with 0 when first button is clicked", async () => {
    const mockHandleSetIndex = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleSetIndex: mockHandleSetIndex });

    await user.click(screen.getAllByRole("button")[0]!);

    expect(mockHandleSetIndex).toHaveBeenCalledWith(0);
  });

  it("should call handleSetIndex with 1 when second button is clicked", async () => {
    const mockHandleSetIndex = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleSetIndex: mockHandleSetIndex });

    await user.click(screen.getAllByRole("button")[1]!);

    expect(mockHandleSetIndex).toHaveBeenCalledWith(1);
  });

  it("should call handleSetIndex with 2 when third button is clicked", async () => {
    const mockHandleSetIndex = jest.fn();
    const user = userEvent.setup();

    renderComponent({ handleSetIndex: mockHandleSetIndex });

    await user.click(screen.getAllByRole("button")[2]!);

    expect(mockHandleSetIndex).toHaveBeenCalledWith(2);
  });
});
