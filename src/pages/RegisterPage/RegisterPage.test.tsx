import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Swal from "sweetalert2";

import { RegisterPage } from "@src/pages/RegisterPage/RegisterPage";

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
        <RegisterPage />
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

describe("RegisterPage.tsx", () => {
  describe("If the key isLoadingImages is 'true'.", () => {
    const mockHandleCreateNewUserWithEmailAndPassword = jest.fn();
    const mockHandleGetImages = jest.fn();

    const isLoadingImages = true;

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        images: [],
        isLoadingImages: isLoadingImages,
        handleCreateNewUserWithEmailAndPassword:
          mockHandleCreateNewUserWithEmailAndPassword,
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
    const mockHandleCreateNewUserWithEmailAndPassword = jest.fn();
    const mockHandleGetImages = jest.fn();

    const isLoadingImages = false;

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        images: mockImages,
        isLoadingImages: isLoadingImages,
        handleCreateNewUserWithEmailAndPassword:
          mockHandleCreateNewUserWithEmailAndPassword,
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

      const img = screen.getByAltText("registerimage");
      const heading = screen.getByRole("heading", { name: firstTitle });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", firstImg);
      expect(img).toHaveAttribute("alt", "registerimage");
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
    const mockHandleCreateNewUserWithEmailAndPassword = jest.fn();
    const mockHandleGetImages = jest.fn();

    const isLoadingImages = false;

    beforeEach(() => {
      jest.clearAllMocks();

      (useAuthStore as jest.Mock).mockReturnValue({
        images: mockImages,
        isLoadingImages: isLoadingImages,
        handleCreateNewUserWithEmailAndPassword:
          mockHandleCreateNewUserWithEmailAndPassword,
        handleGetImages: mockHandleGetImages,
      });
    });

    test("It must render the author's logo, the email input, the password input, the username input, the repeatPassword input, the submit button and the login link.", () => {
      renderComponent();

      const imgLogo = screen.getByAltText("logo");
      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const inputRepeatPassword = screen.getByPlaceholderText(
        "Repeat your password"
      );
      const inputUsername = screen.getByPlaceholderText("Your username");
      const btnRegister = screen.getByRole("button", {
        name: /submit register/i,
      });
      const linkLogin = screen.getByRole("link", {
        name: /Go to login page/i,
      });

      expect(imgLogo).toBeInTheDocument();
      expect(imgLogo).toHaveAttribute("src", mockAssetsImage);
      expect(imgLogo).toHaveAttribute("alt", "logo");
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(inputRepeatPassword).toBeInTheDocument();
      expect(inputUsername).toBeInTheDocument();
      expect(btnRegister).toBeInTheDocument();
      expect(linkLogin).toBeInTheDocument();
    });

    test("It should run the error alert when the form is submitted with invalid fields.", async () => {
      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const btnRegister = screen.getByRole("button", {
        name: /submit register/i,
      });
      const inputRepeatPassword = screen.getByPlaceholderText(
        "Repeat your password"
      );
      const inputUsername = screen.getByPlaceholderText("Your username");

      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveValue("");
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveValue("");
      expect(inputRepeatPassword).toBeInTheDocument();
      expect(inputRepeatPassword).toHaveValue("");
      expect(inputUsername).toBeInTheDocument();
      expect(inputUsername).toHaveValue("");
      expect(btnRegister).toBeInTheDocument();

      await user.click(btnRegister);

      expect(Swal.fire).toHaveBeenCalledTimes(1);
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "You need to complete all the fields",
      });
    });

    test("It should run the error alert when the form is submitted with passwords that do not match.", async () => {
      const email = "123@gmail.com";
      const username = "1234";
      const password = "pepe";
      const repeatPassword = "pep";

      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const btnRegister = screen.getByRole("button", {
        name: /submit register/i,
      });
      const inputRepeatPassword = screen.getByPlaceholderText(
        "Repeat your password"
      );
      const inputUsername = screen.getByPlaceholderText("Your username");

      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveValue("");
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveValue("");
      expect(inputRepeatPassword).toBeInTheDocument();
      expect(inputRepeatPassword).toHaveValue("");
      expect(inputUsername).toBeInTheDocument();
      expect(inputUsername).toHaveValue("");
      expect(btnRegister).toBeInTheDocument();

      await user.clear(inputEmail);
      await user.click(inputEmail);
      await user.keyboard(email);

      await user.clear(inputUsername);
      await user.click(inputUsername);
      await user.keyboard(username);

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      await user.clear(inputRepeatPassword);
      await user.click(inputRepeatPassword);
      await user.keyboard(repeatPassword);

      expect(inputEmail).toHaveValue(email);
      expect(inputUsername).toHaveValue(username);
      expect(inputPassword).toHaveValue(password);
      expect(inputRepeatPassword).toHaveValue(repeatPassword);

      await user.click(btnRegister);

      expect(Swal.fire).toHaveBeenCalledTimes(1);
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "Passwords must be identical to each other",
      });
    });

    test("It must execute the relevant functions when the form is submitted.", async () => {
      const email = "123@gmail.com";
      const username = "1234";
      const password = "pepe";
      const repeatPassword = "pepe";

      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Your email");
      const inputPassword = screen.getByPlaceholderText("Your password");
      const btnRegister = screen.getByRole("button", {
        name: /submit register/i,
      });
      const inputRepeatPassword = screen.getByPlaceholderText(
        "Repeat your password"
      );
      const inputUsername = screen.getByPlaceholderText("Your username");

      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveValue("");
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveValue("");
      expect(inputRepeatPassword).toBeInTheDocument();
      expect(inputRepeatPassword).toHaveValue("");
      expect(inputUsername).toBeInTheDocument();
      expect(inputUsername).toHaveValue("");
      expect(btnRegister).toBeInTheDocument();

      await user.clear(inputEmail);
      await user.click(inputEmail);
      await user.keyboard(email);

      await user.clear(inputUsername);
      await user.click(inputUsername);
      await user.keyboard(username);

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      await user.clear(inputRepeatPassword);
      await user.click(inputRepeatPassword);
      await user.keyboard(repeatPassword);

      expect(inputEmail).toHaveValue(email);
      expect(inputUsername).toHaveValue(username);
      expect(inputPassword).toHaveValue(password);
      expect(inputRepeatPassword).toHaveValue(repeatPassword);

      await user.click(btnRegister);

      expect(mockHandleCreateNewUserWithEmailAndPassword).toHaveBeenCalledTimes(
        1
      );
      expect(mockHandleCreateNewUserWithEmailAndPassword).toHaveBeenCalledWith({
        email: email,
        username: username,
        password: password,
        repeatPassword: repeatPassword,
      });
    });

    test("It must render the wave.", () => {
      const { container } = renderComponent();

      const wave = container.querySelector<HTMLElement>(".register-wave");

      expect(wave).toBeInTheDocument();
    });
  });
});
