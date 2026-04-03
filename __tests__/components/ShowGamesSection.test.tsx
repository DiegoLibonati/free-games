import { render, screen } from "@testing-library/react";

import ShowGamesSection from "@/components/ShowGamesSection/ShowGamesSection";

import { useGamesStore } from "@/hooks/useGamesStore";

import { mockGames } from "@tests/__mocks__/games.mock";

type RenderComponent = {
  container: HTMLElement;
};

const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("@/hooks/useGamesStore");

const renderComponent = (games = mockGames): RenderComponent => {
  (useGamesStore as jest.Mock).mockReturnValue({
    games,
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
  });

  const { container } = render(<ShowGamesSection />);

  return { container };
};

describe("ShowGamesSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the show-games section", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLElement>(".show-games")).toBeInTheDocument();
  });

  it("should render the Other Games heading", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: "Other Games" })).toBeInTheDocument();
  });

  it("should render a DiskGame for each game in the store", () => {
    const { container } = renderComponent(mockGames);

    const disks = container.querySelectorAll<HTMLDivElement>(".disk-game");
    expect(disks).toHaveLength(mockGames.length);
  });

  it("should render no disk games when the store is empty", () => {
    const { container } = renderComponent([]);

    const disks = container.querySelectorAll<HTMLDivElement>(".disk-game");
    expect(disks).toHaveLength(0);
  });

  it("should render at most 12 disk games even when the store has more", () => {
    const manyGames = Array.from({ length: 20 }, (_, i) => ({
      ...mockGames[0]!,
      id: i + 1,
      title: `Game ${i + 1}`,
    }));

    const { container } = renderComponent(manyGames);

    const disks = container.querySelectorAll<HTMLDivElement>(".disk-game");
    expect(disks.length).toBeLessThanOrEqual(12);
  });
});
