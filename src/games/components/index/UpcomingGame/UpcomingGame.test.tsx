import { screen, render } from "@testing-library/react";

import { UpcomingGame } from "@src/games/components/index/UpcomingGame/UpcomingGame";

type RenderComponent = {
  props: {
    img: string;
    name: string;
    release_date: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    img: "1234",
    name: "12345",
    release_date: "12345512",
  };

  const { container } = render(
    <UpcomingGame
      img={props.img}
      name={props.name}
      release_date={props.release_date}
    ></UpcomingGame>
  );

  return {
    props: props,
    container: container,
  };
};

describe("UpcomingGame.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the root.", () => {
      renderComponent();

      const articleRoot = screen.getByRole("article");

      expect(articleRoot).toBeInTheDocument();
      expect(articleRoot).toHaveClass("upcoming-game");
    });

    test("It must render the image and title.", () => {
      const { props } = renderComponent();

      const img = screen.getByRole("img");
      const title = screen.getByRole("heading", {
        name: `${props.name} ${props.release_date}`,
      });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", props.img);
      expect(img).toHaveAttribute("alt", props.name);
      expect(title).toBeInTheDocument();
    });
  });
});
