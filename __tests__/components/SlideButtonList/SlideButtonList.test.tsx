import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import SlideButtonList from "@/components/SlideButtonList/SlideButtonList";

interface RenderOptions {
  index?: number;
  handleSetIndex?: (index: number) => void;
}

const mockHandleSetIndex = jest.fn();

const renderComponent = ({
  index = 0,
  handleSetIndex = mockHandleSetIndex,
}: RenderOptions = {}): RenderResult =>
  render(<SlideButtonList index={index} handleSetIndex={handleSetIndex} />);

describe("SlideButtonList", () => {
  describe("rendering", () => {
    it("should render all three slide buttons", () => {
      renderComponent();
      expect(screen.getAllByRole("button")).toHaveLength(3);
    });

    it("should render the button for slide 1", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Go to slide 1" })).toBeInTheDocument();
    });

    it("should render the button for slide 2", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Go to slide 2" })).toBeInTheDocument();
    });

    it("should render the button for slide 3", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Go to slide 3" })).toBeInTheDocument();
    });

    it("should apply the active class to the button matching the current index", () => {
      renderComponent({ index: 1 });
      expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveClass(
        "slide-button-list__btn--active"
      );
    });

    it("should not apply the active class to buttons not matching the current index", () => {
      renderComponent({ index: 1 });
      expect(screen.getByRole("button", { name: "Go to slide 1" })).not.toHaveClass(
        "slide-button-list__btn--active"
      );
      expect(screen.getByRole("button", { name: "Go to slide 3" })).not.toHaveClass(
        "slide-button-list__btn--active"
      );
    });

    it("should apply the active class to slide 3 button when index is 2", () => {
      renderComponent({ index: 2 });
      expect(screen.getByRole("button", { name: "Go to slide 3" })).toHaveClass(
        "slide-button-list__btn--active"
      );
    });
  });

  describe("behavior", () => {
    it("should call handleSetIndex with 0 when slide 1 button is clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ handleSetIndex: mockHandler });
      await user.click(screen.getByRole("button", { name: "Go to slide 1" }));
      expect(mockHandler).toHaveBeenCalledWith(0);
    });

    it("should call handleSetIndex with 1 when slide 2 button is clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ handleSetIndex: mockHandler });
      await user.click(screen.getByRole("button", { name: "Go to slide 2" }));
      expect(mockHandler).toHaveBeenCalledWith(1);
    });

    it("should call handleSetIndex with 2 when slide 3 button is clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ handleSetIndex: mockHandler });
      await user.click(screen.getByRole("button", { name: "Go to slide 3" }));
      expect(mockHandler).toHaveBeenCalledWith(2);
    });

    it("should call handleSetIndex exactly once per click", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ handleSetIndex: mockHandler });
      await user.click(screen.getByRole("button", { name: "Go to slide 1" }));
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });
});
