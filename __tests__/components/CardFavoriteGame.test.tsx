import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CardFavoriteGameProps } from "@/types/props";

import CardFavoriteGame from "@/components/CardFavoriteGame/CardFavoriteGame";

import { useGamesStore } from "@/hooks/useGamesStore";

import { mockGames } from "@tests/__mocks__/games.mock";

jest.mock("@/hooks/useGamesStore", () => ({ useGamesStore: jest.fn() }));

const mockHandleSetActiveGame = jest.fn();

type RenderComponent = {
  container: HTMLElement;
  props: CardFavoriteGameProps;
};

const renderComponent = (overrides?: Partial<CardFavoriteGameProps>): RenderComponent => {
  const [firstGame] = mockGames;

  (useGamesStore as jest.Mock).mockReturnValue({
    favoritesGames: mockGames,
    handleSetActiveGame: mockHandleSetActiveGame,
  });

  const props: CardFavoriteGameProps = {
    id: firstGame!.id,
    thumbnail: firstGame!.thumbnail,
    title: firstGame!.title,
    ...overrides,
  };

  const { container } = render(<CardFavoriteGame {...props} />);

  return { container, props };
};

describe("CardFavoriteGame", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render an article element", () => {
    renderComponent();

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the game thumbnail", () => {
    const [game] = mockGames;
    renderComponent({ thumbnail: game!.thumbnail });

    expect(screen.getByRole("img")).toHaveAttribute("src", game!.thumbnail);
  });

  it("should render the game title", () => {
    const [game] = mockGames;
    renderComponent({ title: game!.title });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(game!.title);
  });

  it("should call handleSetActiveGame with the correct game when clicked", async () => {
    const user = userEvent.setup();
    const [game] = mockGames;

    renderComponent({ id: game!.id });

    await user.click(screen.getByRole("article"));

    expect(mockHandleSetActiveGame).toHaveBeenCalledWith(game);
  });
});
