import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { DiskGameProps } from "@/types/props";

import DiskGame from "@/components/DiskGame/DiskGame";

import { useGamesStore } from "@/hooks/useGamesStore";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderComponent {
  container: HTMLElement;
  props: DiskGameProps;
}

const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("@/hooks/useGamesStore");

const renderComponent = (overrides?: Partial<DiskGameProps>): RenderComponent => {
  const [game] = mockGames;

  (useGamesStore as jest.Mock).mockReturnValue({
    games: mockGames,
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
  });

  const props: DiskGameProps = {
    id: game!.id,
    title: game!.title,
    short_description: game!.short_description,
    genre: game!.genre,
    platform: game!.platform,
    publisher: game!.publisher,
    developer: game!.developer,
    release_date: game!.release_date,
    freetogame_profile_url: game!.freetogame_profile_url,
    thumbnail: game!.thumbnail,
    ...overrides,
  };

  const { container } = render(<DiskGame {...props} />);

  return { container, props };
};

describe("DiskGame", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the disk-game container", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".disk-game")).toBeInTheDocument();
  });

  it("should render the disk image", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".disk-game__img")).toBeInTheDocument();
  });

  it("should not show information panel by default", () => {
    const { container } = renderComponent();

    expect(
      container.querySelector<HTMLDivElement>(".disk-game__information--open")
    ).not.toBeInTheDocument();
  });

  it("should open the information panel when the disk is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    await user.click(container.querySelector<HTMLDivElement>(".disk-game__img")!);

    expect(
      container.querySelector<HTMLDivElement>(".disk-game__information--open")
    ).toBeInTheDocument();
  });

  it("should render the game title when information is open", async () => {
    const user = userEvent.setup();
    const [game] = mockGames;

    const { container } = renderComponent({ title: game!.title });

    await user.click(container.querySelector<HTMLDivElement>(".disk-game__img")!);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(game!.title);
  });

  it("should render the official website link when information is open", async () => {
    const user = userEvent.setup();
    const [game] = mockGames;

    const { container } = renderComponent({ freetogame_profile_url: game!.freetogame_profile_url });

    await user.click(container.querySelector<HTMLDivElement>(".disk-game__img")!);

    const link = screen.getByRole("link", { name: `Visit official website of ${game!.title}` });
    expect(link).toHaveAttribute("href", game!.freetogame_profile_url);
  });

  it("should close the information panel on double click", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    await user.click(container.querySelector<HTMLDivElement>(".disk-game__img")!);
    await user.dblClick(container.querySelector<HTMLDivElement>(".disk-game__img")!);

    expect(
      container.querySelector<HTMLDivElement>(".disk-game__information--open")
    ).not.toBeInTheDocument();
  });

  it("should call handleSetNewGameToFavorite with the correct game when add-to-favorites is clicked", async () => {
    const user = userEvent.setup();
    const [game] = mockGames;
    const { container } = renderComponent();

    await user.click(container.querySelector<HTMLDivElement>(".disk-game__img")!);
    await user.click(screen.getByRole("button", { name: `Add ${game!.title} to favorites` }));

    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(game);
  });
});
