import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Hamburger from "@/components/Hamburger/Hamburger";

import { useUiStore } from "@/hooks/useUiStore";

type RenderComponent = { container: HTMLElement };

const mockHandleOpenNavBar = jest.fn();
const mockHandleCloseNavBar = jest.fn();

jest.mock("@/hooks/useUiStore");

const renderComponent = (isNavBarOpen = false): RenderComponent => {
  (useUiStore as jest.Mock).mockReturnValue({
    isNavBarOpen,
    handleOpenNavBar: mockHandleOpenNavBar,
    handleCloseNavBar: mockHandleCloseNavBar,
  });

  const { container } = render(<Hamburger />);

  return { container };
};

describe("Hamburger", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the hamburger element", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".hamburger")).toBeInTheDocument();
  });

  it("should render 3 span lines", () => {
    const { container } = renderComponent();

    expect(container.querySelectorAll(".hamburger__span")).toHaveLength(3);
  });

  it("should not have the open class when navbar is closed", () => {
    const { container } = renderComponent(false);

    expect(container.querySelector<HTMLDivElement>(".hamburger")).not.toHaveClass(
      "hamburger--open"
    );
  });

  it("should have the open class when navbar is open", () => {
    const { container } = renderComponent(true);

    expect(container.querySelector<HTMLDivElement>(".hamburger")).toHaveClass("hamburger--open");
  });

  it("should call handleOpenNavBar when clicked while closed", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent(false);

    await user.click(container.querySelector<HTMLDivElement>(".hamburger")!);

    expect(mockHandleOpenNavBar).toHaveBeenCalledTimes(1);
    expect(mockHandleCloseNavBar).not.toHaveBeenCalled();
  });

  it("should call handleCloseNavBar when clicked while open", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent(true);

    await user.click(container.querySelector<HTMLDivElement>(".hamburger")!);

    expect(mockHandleCloseNavBar).toHaveBeenCalledTimes(1);
    expect(mockHandleOpenNavBar).not.toHaveBeenCalled();
  });
});
