import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";

import RegisterPage from "@/pages/RegisterPage/RegisterPage";

import { useAuthStore } from "@/hooks/useAuthStore";

import { mockImages } from "@tests/__mocks__/images.mock";

type RenderPage = { container: HTMLElement };

const mockHandleCreateNewUserWithEmailAndPassword = jest.fn();
const mockHandleGetImages = jest.fn();

jest.mock("@/hooks/useAuthStore");

const renderPage = (images: string[] = [], isLoadingImages = false): RenderPage => {
  (useAuthStore as jest.Mock).mockReturnValue({
    images,
    isLoadingImages,
    handleCreateNewUserWithEmailAndPassword: mockHandleCreateNewUserWithEmailAndPassword,
    handleGetImages: mockHandleGetImages,
  });

  const { container } = render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  return { container };
};

describe("RegisterPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element", () => {
    const { container } = renderPage();

    expect(container.querySelector<HTMLElement>("main.register-page")).toBeInTheDocument();
  });

  it("should render the username input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Your username")).toBeInTheDocument();
  });

  it("should render the email input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
  });

  it("should render the password input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
  });

  it("should render the repeat password input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Repeat your password")).toBeInTheDocument();
  });

  it("should render the create account button", () => {
    renderPage();

    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
  });

  it("should render the link to the login page", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "Go to login page" })).toHaveAttribute(
      "href",
      "/login"
    );
  });

  it("should show loader while images are loading", () => {
    const { container } = renderPage([], true);

    expect(container.querySelector<HTMLDivElement>(".loader-all-wrapper")).toBeInTheDocument();
  });

  it("should show the slide image when images are loaded", () => {
    renderPage(mockImages, false);

    expect(screen.getByAltText("registerimage")).toHaveAttribute("src", mockImages[0]);
  });

  it("should update the username input when typed", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("Your username"), "johndoe");

    expect(screen.getByPlaceholderText("Your username")).toHaveValue("johndoe");
  });

  it("should call handleGetImages on mount", () => {
    renderPage();

    expect(mockHandleGetImages).toHaveBeenCalledTimes(1);
  });

  it("should show an error alert when submitting with incomplete fields", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("Your username"), "johndoe");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ text: "You need to complete all the fields" })
    );
    expect(mockHandleCreateNewUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("should show an error alert when passwords do not match", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("Your username"), "johndoe");
    await user.type(screen.getByPlaceholderText("Your email"), "john@test.com");
    await user.type(screen.getByPlaceholderText("Your password"), "password123");
    await user.type(screen.getByPlaceholderText("Repeat your password"), "different456");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ text: "Passwords must be identical to each other" })
    );
    expect(mockHandleCreateNewUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("should call handleCreateNewUserWithEmailAndPassword when all fields are valid", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("Your username"), "johndoe");
    await user.type(screen.getByPlaceholderText("Your email"), "john@test.com");
    await user.type(screen.getByPlaceholderText("Your password"), "password123");
    await user.type(screen.getByPlaceholderText("Repeat your password"), "password123");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(mockHandleCreateNewUserWithEmailAndPassword).toHaveBeenCalledWith({
      username: "johndoe",
      email: "john@test.com",
      password: "password123",
      repeatPassword: "password123",
    });
  });
});
