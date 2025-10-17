import { screen, render } from "@testing-library/react";

import { Provider } from "react-redux";

import { HomeImagesSection } from "@src/components/HomeImagesSection/HomeImagesSection";

import { imagesOfGames } from "@src/constants/data";

import { store } from "@src/app/store";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <HomeImagesSection></HomeImagesSection>
    </Provider>
  );

  return {
    container: container,
  };
};

describe("HomeImagesSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render all images.", () => {
      const { container } = renderComponent();

      const images = container.querySelectorAll(
        ".home-images__background"
      ) as NodeList;

      expect(images).toHaveLength(imagesOfGames.length);
    });

    test("It must render the first image with the activeSlide class.", () => {
      const { container } = renderComponent();

      const images = container.querySelectorAll(
        ".home-images__background"
      ) as NodeList;

      const firstImg = images[0];

      expect(firstImg).toBeInTheDocument();
      expect(firstImg).toHaveClass("home-images__background--active-slide");
    });

    test("It must render the image that follows the first image with the nextSlide class.", () => {
      const { container } = renderComponent();

      const images = container.querySelectorAll(
        ".home-images__background"
      ) as NodeList;

      const secondImg = images[1];

      expect(secondImg).toBeInTheDocument();
      expect(secondImg).toHaveClass("home-images__background--next-slide");
    });

    test("It must render the last image with the lastSlide class.", () => {
      const { container } = renderComponent();

      const images = container.querySelectorAll(
        ".home-images__background"
      ) as NodeList;

      const lastImg = images[images.length - 1];

      expect(lastImg).toBeInTheDocument();
      expect(lastImg).toHaveClass("home-images__background--last-slide");
    });

    test("It must render the HomeCard component.", () => {
      renderComponent();

      const homeCardRoot = screen.getByRole("article");

      expect(homeCardRoot).toBeInTheDocument();
      expect(homeCardRoot).toHaveClass("home-card");
    });
  });
});
