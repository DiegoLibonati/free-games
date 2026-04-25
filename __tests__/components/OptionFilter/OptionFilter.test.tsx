import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import OptionFilter from "@/components/OptionFilter/OptionFilter";

interface RenderOptions {
  name?: string;
  isOpen?: boolean;
  arr?: string[];
  handleClickFilter?: (value: string) => void;
  handleClickOpenAndClose?: React.MouseEventHandler<HTMLDivElement>;
}

const mockHandleClickFilter = jest.fn();
const mockHandleClickOpenAndClose = jest.fn();

const renderComponent = ({
  name = "Genre",
  isOpen = false,
  arr = ["Action", "RPG", "Strategy"],
  handleClickFilter = mockHandleClickFilter,
  handleClickOpenAndClose = mockHandleClickOpenAndClose,
}: RenderOptions = {}): RenderResult =>
  render(
    <OptionFilter
      name={name}
      isOpen={isOpen}
      arr={arr}
      handleClickFilter={handleClickFilter}
      handleClickOpenAndClose={handleClickOpenAndClose}
    />
  );

describe("OptionFilter", () => {
  describe("rendering", () => {
    it("should render the article element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>("article.option-filter")).toBeInTheDocument();
    });

    it("should render the filter name heading", () => {
      renderComponent({ name: "Platform" });
      expect(screen.getByText("Platform")).toBeInTheDocument();
    });

    it("should render the open button when isOpen is false", () => {
      renderComponent({ isOpen: false });
      expect(screen.getByRole("button", { name: "Open category filter" })).toBeInTheDocument();
    });

    it("should render the close button when isOpen is true", () => {
      renderComponent({ isOpen: true });
      expect(screen.getByRole("button", { name: "Close category filter" })).toBeInTheDocument();
    });

    it("should not render the open button when isOpen is true", () => {
      renderComponent({ isOpen: true });
      expect(
        screen.queryByRole("button", { name: "Open category filter" })
      ).not.toBeInTheDocument();
    });

    it("should not render the close button when isOpen is false", () => {
      renderComponent({ isOpen: false });
      expect(
        screen.queryByRole("button", { name: "Close category filter" })
      ).not.toBeInTheDocument();
    });

    it("should render the list of filter options when isOpen is true", () => {
      renderComponent({ isOpen: true, arr: ["Action", "RPG", "Strategy"] });
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("RPG")).toBeInTheDocument();
      expect(screen.getByText("Strategy")).toBeInTheDocument();
    });

    it("should not render filter options when isOpen is false", () => {
      renderComponent({ isOpen: false, arr: ["Action", "RPG"] });
      expect(screen.queryByText("Action")).not.toBeInTheDocument();
      expect(screen.queryByText("RPG")).not.toBeInTheDocument();
    });

    it("should render the correct number of list items when open", () => {
      renderComponent({ isOpen: true, arr: ["A", "B", "C", "D"] });
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });
  });

  describe("behavior", () => {
    it("should call handleClickOpenAndClose when the header is clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ handleClickOpenAndClose: mockHandler });
      await user.click(screen.getByText("Genre"));
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("should call handleClickFilter with the correct value when an option is clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ isOpen: true, arr: ["Action"], handleClickFilter: mockHandler });
      await user.click(screen.getByText("Action"));
      expect(mockHandler).toHaveBeenCalledWith("Action");
    });

    it("should call handleClickOpenAndClose when the open button is clicked", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      renderComponent({ isOpen: false, handleClickOpenAndClose: mockHandler });
      await user.click(screen.getByRole("button", { name: "Open category filter" }));
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should render an empty list when arr is empty and isOpen is true", () => {
      renderComponent({ isOpen: true, arr: [] });
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("should render the name even when the list is not open", () => {
      renderComponent({ name: "Category", isOpen: false });
      expect(screen.getByText("Category")).toBeInTheDocument();
    });
  });
});
