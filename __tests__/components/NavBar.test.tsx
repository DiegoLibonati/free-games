import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import NavBar from "@/components/NavBar/NavBar";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useUiStore } from "@/hooks/useUiStore";

type RenderComponent = { container: HTMLElement };

const mockHandleLogOut = jest.fn();
const mockHandleOpenNavBar = jest.fn();
const mockHandleCloseNavBar = jest.fn();

jest.mock("@/hooks/useAuthStore");
jest.mock("@/hooks/useUiStore");

const renderComponent = (displayName = "TestUser", photoURL = ""): RenderComponent => {
  (useAuthStore as jest.Mock).mockReturnValue({
    displayName,
    photoURL,
    handleLogOut: mockHandleLogOut,
  });

  (useUiStore as jest.Mock).mockReturnValue({
    isNavBarOpen: true,
    handleOpenNavBar: mockHandleOpenNavBar,
    handleCloseNavBar: mockHandleCloseNavBar,
  });

  const { container } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  return { container };
};

describe("NavBar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header element", () => {
    renderComponent();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    renderComponent();

    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("should render the Home navigation link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Navigate to home page" })).toBeInTheDocument();
  });

  it("should render the Favorites navigation link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Navigate to favorites page" })).toBeInTheDocument();
  });

  it("should render the Games navigation link", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Navigate to games page" })).toBeInTheDocument();
  });

  it("should render the logout button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });

  it("should render the user display name", () => {
    renderComponent("JohnDoe");

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
  });

  it("should render a placeholder avatar when photoURL is empty", () => {
    const { container } = renderComponent("TestUser", "");

    const avatars = container.querySelectorAll<HTMLImageElement>(".header-wrapper__avatar");
    expect(avatars).toHaveLength(1);
  });

  it("should render the user avatar when photoURL is provided", () => {
    const { container } = renderComponent("TestUser", "https://example.com/photo.jpg");

    const avatar = container.querySelector<HTMLImageElement>(".header-wrapper__avatar");
    expect(avatar).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("should call handleLogOut when the logout button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: "Log out" }));

    expect(mockHandleLogOut).toHaveBeenCalledTimes(1);
  });
});
