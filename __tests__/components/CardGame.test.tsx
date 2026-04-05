import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CardGameProps } from "@/types/props";

import CardGame from "@/components/CardGame/CardGame";

import { useGamesStore } from "@/hooks/useGamesStore";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderComponent {
  container: HTMLElement;
  props: CardGameProps;
}

const mockHandleSetActiveGame = jest.fn();

jest.mock("@/hooks/useGamesStore");

const renderComponent = (overrides?: Partial<CardGameProps>): RenderComponent => {
  const [firstGame] = mockGames;

  (useGamesStore as jest.Mock).mockReturnValue({
    games: mockGames,
    handleSetActiveGame: mockHandleSetActiveGame,
  });

  const props: CardGameProps = {
    id: firstGame!.id,
    thumbnail: firstGame!.thumbnail,
    title: firstGame!.title,
    ...overrides,
  };

  const { container } = render(<CardGame {...props} />);

  return { container, props };
};

describe("CardGame", () => {
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
