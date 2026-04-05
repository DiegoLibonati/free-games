import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";

import LoginPage from "@/pages/LoginPage/LoginPage";

import { useAuthStore } from "@/hooks/useAuthStore";

import { mockImages } from "@tests/__mocks__/images.mock";

interface RenderPage {
  container: HTMLElement;
}

const mockHandleLoginWithEmailAndPassword = jest.fn();
const mockHandleLoginWithGoogle = jest.fn();
const mockHandleGetImages = jest.fn();

jest.mock("@/hooks/useAuthStore");

const renderPage = (images: string[] = [], isLoadingImages = false): RenderPage => {
  (useAuthStore as jest.Mock).mockReturnValue({
    images,
    isLoadingImages,
    handleLoginWithEmailAndPassword: mockHandleLoginWithEmailAndPassword,
    handleLoginWithGoogle: mockHandleLoginWithGoogle,
    handleGetImages: mockHandleGetImages,
  });

  const { container } = render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  return { container };
};

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.main-login")).toBeInTheDocument();
  });

  it("should render the email input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
  });

  it("should render the password input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
  });

  it("should render the sign-in button", () => {
    renderPage();

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should render the sign-in with Google button", () => {
    renderPage();

    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
  });

  it("should render the link to the register page", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "Go to register page" })).toHaveAttribute(
      "href",
      "/register"
    );
  });

  it("should show loader while images are loading", () => {
    const { container } = renderPage([], true);

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show the slide image when images are loaded", () => {
    renderPage(mockImages, false);

    expect(screen.getByAltText("loginimage")).toHaveAttribute("src", mockImages[0]);
  });

  it("should update the email input when typed", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("Your email"), "user@test.com");

    expect(screen.getByPlaceholderText("Your email")).toHaveValue("user@test.com");
  });

  it("should call handleGetImages on mount", () => {
    renderPage();

    expect(mockHandleGetImages).toHaveBeenCalledTimes(1);
  });

  it("should show an error alert when submitting with empty fields", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: "error", text: "Invalid email or password" })
    );
  });

  it("should not call handleLoginWithEmailAndPassword when fields are empty", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(mockHandleLoginWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("should call handleLoginWithEmailAndPassword with credentials when form is submitted", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("Your email"), "user@test.com");
    await user.type(screen.getByPlaceholderText("Your password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(mockHandleLoginWithEmailAndPassword).toHaveBeenCalledWith({
      email: "user@test.com",
      password: "password123",
    });
  });

  it("should call handleLoginWithGoogle when the Google button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Sign in with Google" }));

    expect(mockHandleLoginWithGoogle).toHaveBeenCalledTimes(1);
  });
});
