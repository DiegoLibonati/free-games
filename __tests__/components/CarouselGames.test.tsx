import { render, screen } from "@testing-library/react";

import type { CarouselGamesProps } from "@/types/props";

import CarouselGames from "@/components/CarouselGames/CarouselGames";

import { useGamesStore } from "@/hooks/useGamesStore";

import { mockGames } from "@tests/__mocks__/games.mock";

type RenderComponent = {
  container: HTMLElement;
  props: CarouselGamesProps;
};

const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("@/hooks/useGamesStore");

const renderComponent = (overrides?: Partial<CarouselGamesProps>): RenderComponent => {
  (useGamesStore as jest.Mock).mockReturnValue({
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
  });

  const props: CarouselGamesProps = {
    name: "MMORPG",
    games: mockGames,
    ...overrides,
  };

  const { container } = render(<CarouselGames {...props} />);

  return { container, props };
};

describe("CarouselGames", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the carousel article", () => {
    renderComponent();

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the category name", () => {
    renderComponent({ name: "MMORPG" });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("MMORPG");
  });

  it("should render an image for each game", () => {
    renderComponent({ games: mockGames });

    expect(screen.getAllByRole("img")).toHaveLength(mockGames.length);
  });

  it("should render an add-to-favorites button for each game", () => {
    renderComponent({ games: mockGames });

    expect(screen.getAllByRole("button")).toHaveLength(mockGames.length);
  });

  it("should render no images when games array is empty", () => {
    renderComponent({ games: [] });

    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
