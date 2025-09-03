import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { NavBar } from "./NavBar";

import { useUiStore } from "../../../hooks/useUiStore";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { store } from "../../../store/store";

import { mockAssetsImage } from "../../../../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NavBar />
      </MemoryRouter>
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("../../../hooks/useUiStore", () => ({
  ...jest.requireActual("../../../hooks/useUiStore"),
  useUiStore: jest.fn(),
}));

jest.mock("../../../hooks/useAuthStore", () => ({
  ...jest.requireActual("../../../hooks/useAuthStore"),
  useAuthStore: jest.fn(),
}));

describe("NavBar.tsx", () => {
  describe("If isNavBarOpen is 'true'.", () => {
    const mockHandleLogOut = jest.fn();

    const displayName = "pepe";
    const photoURL = "https://google.com.ar";
    const isNavBarOpen = true;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
      });
    });

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        displayName: displayName,
        photoURL: photoURL,
        handleLogOut: mockHandleLogOut,
      });
    });

    test("It must render the nav with the relevant classes.", () => {
      renderComponent();

      const nav = screen.getByRole("navigation");

      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass("header-wrapper__nav header-wrapper__nav--open");
    });
  });

  describe("If isNavBarOpen is 'false'.", () => {
    const mockHandleLogOut = jest.fn();

    const displayName = "pepe";
    const photoURL = "https://google.com.ar";
    const isNavBarOpen = false;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
      });
    });

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        displayName: displayName,
        photoURL: photoURL,
        handleLogOut: mockHandleLogOut,
      });
    });

    test("It must render the nav with the relevant classes.", () => {
      renderComponent();

      const nav = screen.getByRole("navigation");

      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass("header-wrapper__nav");
    });
  });

  describe("General Tests.", () => {
    const mockHandleLogOut = jest.fn();

    const displayName = "pepe";
    const photoURL = "https://google.com.ar";
    const isNavBarOpen = false;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
      });
    });

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        displayName: displayName,
        photoURL: photoURL,
        handleLogOut: mockHandleLogOut,
      });
    });

    test("It must render the header.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const header = container.querySelector(".header-wrapper");

      expect(header).toBeInTheDocument();
    });

    test("It must render the logo and the hamburger.", () => {
      const { container } = renderComponent();

      const img = screen.getByAltText("logo");
      // eslint-disable-next-line
      const hamburger = container.querySelector(".hamburger") as HTMLDivElement;

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", mockAssetsImage);
      expect(img).toHaveAttribute("alt", "logo");
      expect(hamburger).toBeInTheDocument();
    });

    test("It must render the nav, the list and all the link items to navigate.", () => {
      renderComponent();

      const navigation = screen.getByRole("navigation");
      const list = screen.getByRole("list");
      const listItems = screen.getAllByRole("listitem");

      expect(navigation).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      // eslint-disable-next-line
      expect(listItems).toHaveLength(list.children.length);

      const linkHome = screen.getByRole("link", { name: /go to home page/i });
      const linkFavorite = screen.getByRole("link", {
        name: /go to favorite page/i,
      });
      const linkGames = screen.getByRole("link", { name: /go to games page/i });

      expect(linkHome).toBeInTheDocument();
      expect(linkFavorite).toBeInTheDocument();
      expect(linkGames).toBeInTheDocument();
    });

    test("It should render the logout button and execute the relevant functions when it is clicked.", async () => {
      renderComponent();

      const btnLogOut = screen.getByRole("button", { name: /logout/i });

      expect(btnLogOut).toBeInTheDocument();

      await user.click(btnLogOut);

      expect(mockHandleLogOut).toHaveBeenCalledTimes(1);
    });

    test("It must render the username.", () => {
      renderComponent();

      const headingUsername = screen.getByRole("heading", {
        name: displayName,
      });

      expect(headingUsername).toBeInTheDocument();
    });
  });

  describe("If photoURL has content.", () => {
    const mockHandleLogOut = jest.fn();

    const displayName = "pepe";
    const photoURL = "https://google.com.ar";
    const isNavBarOpen = true;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
      });
    });

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        displayName: displayName,
        photoURL: photoURL,
        handleLogOut: mockHandleLogOut,
      });
    });

    test("It must render the image with the corresponding src.", () => {
      renderComponent();

      const photoURLImg = screen.getByAltText(displayName);

      expect(photoURLImg).toBeInTheDocument();
      expect(photoURLImg).toHaveAttribute("src", photoURL);
      expect(photoURLImg).toHaveAttribute("alt", displayName);
    });
  });

  describe("If photoURL has NOT content.", () => {
    const mockHandleLogOut = jest.fn();

    const displayName = "pepe";
    const photoURL = "";
    const isNavBarOpen = true;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
      });
    });

    beforeEach(() => {
      (useAuthStore as jest.Mock).mockReturnValue({
        displayName: displayName,
        photoURL: photoURL,
        handleLogOut: mockHandleLogOut,
      });
    });

    test("It must render the image with the corresponding src.", () => {
      renderComponent();

      const imgDefault = screen.getByAltText("photoURL");

      expect(imgDefault).toBeInTheDocument();
      expect(imgDefault).toHaveAttribute("src", "http://i.imgur.com/AtBE7.png");
      expect(imgDefault).toHaveAttribute("alt", "photoURL");
    });
  });
});
