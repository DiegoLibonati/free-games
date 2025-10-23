import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Swal from "sweetalert2";

import { LoginPage } from "@src/pages/LoginPage/LoginPage";

import { useAuthStore } from "@src/hooks/useAuthStore";

import { store } from "@src/app/store";

import {
  mockAssetsImage,
  mockImages,
  mockSlideImagesAuth,
} from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useAuthStore", () => ({
  ...jest.requireActual("@src/hooks/useAuthStore"),
  useAuthStore: jest.fn(),
}));

describe("LoginPage.tsx", () => {
  describe("If the key isLoadingImages is 'true'.", () => {
    const mockHandleLoginWithEmailAndPassword = jest.fn();
    const mockHandleLoginWithGoogle = jest.fn();
    const mockHandleGetImages = jest.fn();

    const isLoadingImages = true;

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        images: [],
        isLoadingImages: isLoadingImages,
        handleLoginWithEmailAndPassword: mockHandleLoginWithEmailAndPassword,
        handleLoginWithGoogle: mockHandleLoginWithGoogle,
        handleGetImages: mockHandleGetImages,
      });
    });

    test("It must render the loading of the images.", () => {
      const { container } = renderComponent();

      const loader = container.querySelector<HTMLDivElement>(
        ".loader-all-wrapper"
      );

      expect(loader).toBeInTheDocument();
    });
  });

  describe("If the key isLoadingImages is 'false'.", () => {
    const mockHandleLoginWithEmailAndPassword = jest.fn();
    const mockHandleLoginWithGoogle = jest.fn();
    const mockHandleGetImages = jest.fn();

    const isLoadingImages = false;

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        images: mockImages,
        isLoadingImages: isLoadingImages,
        handleLoginWithEmailAndPassword: mockHandleLoginWithEmailAndPassword,
        handleLoginWithGoogle: mockHandleLoginWithGoogle,
        handleGetImages: mockHandleGetImages,
      });
    });

    test("It must not render the loading of the images.", () => {
      const { container } = renderComponent();

      const loader = container.querySelector<HTMLDivElement>(
        ".loader-all-wrapper"
      );

      expect(loader).not.toBeInTheDocument();
    });

    test("It must render the image of the first game, the corresponding title and the slide buttons.", () => {
      const firstImg = mockImages[0];
      const firstTitle = mockSlideImagesAuth["0"];
      const slideKeys = Object.keys(mockSlideImagesAuth);

      renderComponent();

      const img = screen.getByAltText("loginimage");
      const heading = screen.getByRole("heading", { name: firstTitle });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", firstImg);
      expect(img).toHaveAttribute("alt", "loginimage");
      expect(heading).toBeInTheDocument();

      for (const slideKey of slideKeys) {
        const btnSlide = screen.getByRole("button", {
          name: `item-${slideKey}`,
        });

        expect(btnSlide).toBeInTheDocument();
      }
    });
  });

  describe("General Tests", () => {
    const mockHandleLoginWithEmailAndPassword = jest.fn();
    const mockHandleLoginWithGoogle = jest.fn();
    const mockHandleGetImages = jest.fn();

    const isLoadingImages = false;

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        images: mockImages,
        isLoadingImages: isLoadingImages,
        handleLoginWithEmailAndPassword: mockHandleLoginWithEmailAndPassword,
        handleLoginWithGoogle: mockHandleLoginWithGoogle,
        handleGetImages: mockHandleGetImages,
      });
    });

    test("It must render the author's logo, the email input, the password input, the submit button, the Google button and the register link.", () => {
      renderComponent();

      const imgLogo = screen.getByAltText("logo");
      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const btnLogin = screen.getByRole("button", { name: /submit login/i });
      const btnLoginGoogle = screen.getByRole("button", {
        name: /login with google/i,
      });
      const linkRegister = screen.getByRole("link", {
        name: /Go to register page/i,
      });

      expect(imgLogo).toBeInTheDocument();
      expect(imgLogo).toHaveAttribute("src", mockAssetsImage);
      expect(imgLogo).toHaveAttribute("alt", "logo");
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(btnLogin).toBeInTheDocument();
      expect(btnLoginGoogle).toBeInTheDocument();
      expect(linkRegister).toBeInTheDocument();
    });

    test("It should run the error alert when the form is submitted with invalid fields.", async () => {
      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const btnLogin = screen.getByRole("button", { name: /submit login/i });

      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveValue("");
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveValue("");
      expect(btnLogin).toBeInTheDocument();

      await user.click(btnLogin);

      expect(Swal.fire).toHaveBeenCalledTimes(1);
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password",
      });
    });

    test("It must execute the relevant functions when the form is submitted.", async () => {
      const email = "123@gmail.com";
      const password = "1234";

      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const btnLogin = screen.getByRole("button", { name: /submit login/i });

      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveValue("");
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveValue("");
      expect(btnLogin).toBeInTheDocument();

      await user.clear(inputEmail);
      await user.click(inputEmail);
      await user.keyboard(email);

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      expect(inputEmail).toHaveValue(email);
      expect(inputPassword).toHaveValue(password);

      await user.click(btnLogin);

      expect(mockHandleLoginWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockHandleLoginWithEmailAndPassword).toHaveBeenCalledWith({
        email: email,
        password: password,
      });
    });

    test("It should execute the relevant functions when the Google button is clicked.", async () => {
      renderComponent();

      const btnLoginGoogle = screen.getByRole("button", {
        name: /login with google/i,
      });

      expect(btnLoginGoogle).toBeInTheDocument();

      await user.click(btnLoginGoogle);

      expect(mockHandleLoginWithGoogle).toHaveBeenCalledTimes(1);
    });

    test("It must render the wave.", () => {
      const { container } = renderComponent();

      const wave = container.querySelector<HTMLElement>(".login-wave");

      expect(wave).toBeInTheDocument();
    });
  });
});
