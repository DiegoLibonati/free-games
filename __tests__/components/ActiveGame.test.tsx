import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import ActiveGame from "@/components/ActiveGame/ActiveGame";

import { useGamesStore } from "@/hooks/useGamesStore";
import { useUiStore } from "@/hooks/useUiStore";

import { mockGames } from "@tests/__mocks__/games.mock";

interface RenderComponent {
  container: HTMLElement;
}

const mockHandleClearActiveGame = jest.fn();
const mockHandleSetNewGameToFavorite = jest.fn();
const mockHandleDeleteFavoriteGame = jest.fn();
const mockHandleOpenAlert = jest.fn();

const [activeGame] = mockGames;

jest.mock("@/hooks/useGamesStore");
jest.mock("@/hooks/useUiStore");

const renderComponent = (initialRoute = "/explore"): RenderComponent => {
  (useGamesStore as jest.Mock).mockReturnValue({
    activeGame,
    handleClearActiveGame: mockHandleClearActiveGame,
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
    handleDeleteFavoriteGame: mockHandleDeleteFavoriteGame,
  });

  (useUiStore as jest.Mock).mockReturnValue({
    handleOpenAlert: mockHandleOpenAlert,
  });

  const { container } = render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ActiveGame />
    </MemoryRouter>
  );

  return { container };
};

describe("ActiveGame", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal wrapper", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".active-game-wrapper")).toBeInTheDocument();
  });

  it("should render the game title", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(activeGame!.title);
  });

  it("should render the game description", () => {
    renderComponent();

    expect(screen.getByText(activeGame!.short_description)).toBeInTheDocument();
  });

  it("should render the close button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Close game details" })).toBeInTheDocument();
  });

  it("should render the official website link", () => {
    renderComponent();

    expect(
      screen.getByRole("link", { name: `Visit official website of ${activeGame!.title}` })
    ).toHaveAttribute("href", activeGame!.game_url);
  });

  it("should render the remove-from-favorites button on /favorite route", () => {
    renderComponent("/favorite");

    expect(
      screen.getByRole("button", { name: `Remove ${activeGame!.title} from favorites` })
    ).toBeInTheDocument();
  });

  it("should render the add-to-favorites button on /explore route", () => {
    renderComponent("/explore");

    expect(
      screen.getByRole("button", { name: `Add ${activeGame!.title} to favorites` })
    ).toBeInTheDocument();
  });

  it("should call handleClearActiveGame when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: "Close game details" }));

    expect(mockHandleClearActiveGame).toHaveBeenCalledTimes(1);
  });

  it("should call handleClearActiveGame and handleSetNewGameToFavorite when add-to-favorites is clicked", async () => {
    const user = userEvent.setup();
    renderComponent("/explore");

    await user.click(screen.getByRole("button", { name: `Add ${activeGame!.title} to favorites` }));

    expect(mockHandleClearActiveGame).toHaveBeenCalledTimes(1);
    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(activeGame);
  });

  it("should call handleClearActiveGame, handleDeleteFavoriteGame and handleOpenAlert when remove-from-favorites is clicked", async () => {
    const user = userEvent.setup();
    renderComponent("/favorite");

    await user.click(
      screen.getByRole("button", { name: `Remove ${activeGame!.title} from favorites` })
    );

    expect(mockHandleClearActiveGame).toHaveBeenCalledTimes(1);
    expect(mockHandleDeleteFavoriteGame).toHaveBeenCalledWith(activeGame);
    expect(mockHandleOpenAlert).toHaveBeenCalledWith(
      expect.objectContaining({ type: "success", title: "Favorite Game" })
    );
  });
});
