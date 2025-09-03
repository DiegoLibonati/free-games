import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { RegisterPage } from "./RegisterPage";

import { gamesApi } from "../../../api/gamesApi";
import { store } from "../../../store/store";

import {
  mockRequestGames,
  mockSlideImagesAuth,
} from "../../../../tests/jest.constants";

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

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    </MemoryRouter>
  );

  await screen.findByRole("heading", { name: mockSlideImagesAuth["0"] });

  return {
    container: container,
  };
};

describe("RegisterPage.tsx - API", () => {
  describe("If the endpoint is getting and loading.", () => {
    const mock = new MockAdapter(gamesApi);

    mock
      .onGet("/api/games", { params: { id: "452" } })
      .reply(200, mockRequestGames);

    test("It should show the loader.", async () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const loader = container.querySelector(".loader-all-wrapper");

      expect(loader).toBeInTheDocument();

      await screen.findByRole("heading", { name: mockSlideImagesAuth["0"] });
    });
  });

  describe("If the endpoint returns 200 with content.", () => {
    const mock = new MockAdapter(gamesApi);

    mock
      .onGet("/api/games", { params: { id: "452" } })
      .reply(200, mockRequestGames);

    test("It should show the images obtained from the endpoint.", async () => {
      const firstImg = mockRequestGames[0].thumbnail;

      await asyncRenderComponent();

      const img = screen.getByAltText("registerimage");

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", firstImg);
      expect(img).toHaveAttribute("alt", "registerimage");
    });
  });
});
