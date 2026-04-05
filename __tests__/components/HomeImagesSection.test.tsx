import { render, screen } from "@testing-library/react";

import HomeImagesSection from "@/components/HomeImagesSection/HomeImagesSection";

import { useGamesStore } from "@/hooks/useGamesStore";
import { useAutoSlide } from "@/hooks/useAutoSlide";

import { imagesOfGames } from "@/constants/data";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderComponent {
  container: HTMLElement;
}

const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("@/hooks/useGamesStore");
jest.mock("@/hooks/useAutoSlide");

const renderComponent = (autoIndex = 0, games = mockGames): RenderComponent => {
  (useAutoSlide as jest.Mock).mockReturnValue(autoIndex);

  (useGamesStore as jest.Mock).mockReturnValue({
    games,
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
  });

  const { container } = render(<HomeImagesSection />);

  return { container };
};

describe("HomeImagesSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the home-images section", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLElement>(".home-images")).toBeInTheDocument();
  });

  it("should render one background div per image in imagesOfGames", () => {
    const { container } = renderComponent();

    const backgrounds = container.querySelectorAll<HTMLDivElement>(".home-images__background");
    expect(backgrounds).toHaveLength(imagesOfGames.length);
  });

  it("should apply the active-slide class to the image at the current autoIndex", () => {
    const { container } = renderComponent(2);

    const allBackgrounds = container.querySelectorAll<HTMLDivElement>(".home-images__background");
    expect(allBackgrounds[2]).toHaveClass("home-images__background--active-slide");
  });

  it("should apply the last-slide class to the image before the active one", () => {
    const { container } = renderComponent(2);

    const allBackgrounds = container.querySelectorAll<HTMLDivElement>(".home-images__background");
    expect(allBackgrounds[1]).toHaveClass("home-images__background--last-slide");
  });

  it("should wrap the last-slide class to the final image when autoIndex is 0", () => {
    const { container } = renderComponent(0);

    const allBackgrounds = container.querySelectorAll<HTMLDivElement>(".home-images__background");
    const lastIndex = imagesOfGames.length - 1;
    expect(allBackgrounds[lastIndex]).toHaveClass("home-images__background--last-slide");
  });

  it("should render the HomeCard component", () => {
    renderComponent(0, mockGames);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
