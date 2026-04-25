import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import OptionFilterListItem from "@/components/OptionFilterListItem/OptionFilterListItem";

interface RenderOptions {
  filter?: string;
  handleClickFilter?: (value: string) => void;
}

const mockHandleClickFilter = jest.fn();

const renderComponent = ({
  filter = "Action",
  handleClickFilter = mockHandleClickFilter,
}: RenderOptions = {}): RenderResult =>
  render(<OptionFilterListItem filter={filter} handleClickFilter={handleClickFilter} />);

describe("OptionFilterListItem", () => {
  describe("rendering", () => {
    it("should render the list item element", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should render the filter text", () => {
      renderComponent({ filter: "Strategy" });
      expect(screen.getByText("Strategy")).toBeInTheDocument();
    });

    it("should apply the option-filter-list-item class", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toHaveClass("option-filter-list-item");
    });
  });

  describe("behavior", () => {
    it("should call handleClickFilter with the filter value when clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ filter: "RPG", handleClickFilter: mockHandler });
      await user.click(screen.getByText("RPG"));
      expect(mockHandler).toHaveBeenCalledWith("RPG");
    });

    it("should call handleClickFilter exactly once per click", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ handleClickFilter: mockHandler });
      await user.click(screen.getByRole("listitem"));
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should render with a numeric-like string filter", () => {
      renderComponent({ filter: "2024" });
      expect(screen.getByText("2024")).toBeInTheDocument();
    });

    it("should pass the exact filter string to the handler on click", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ filter: "Shooter", handleClickFilter: mockHandler });
      await user.click(screen.getByRole("listitem"));
      expect(mockHandler).toHaveBeenCalledWith("Shooter");
    });
  });
});
