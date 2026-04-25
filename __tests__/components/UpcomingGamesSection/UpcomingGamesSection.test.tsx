import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import UpcomingGamesSection from "@/components/UpcomingGamesSection/UpcomingGamesSection";

import { upcomingGames } from "@/constants/data";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    xRapid: { apiKey: "test", apiHost: "test", apiUrl: "test" },
    firebase: {
      apiKey: "test",
      authDomain: "test",
      projectId: "test",
      storageBucket: "test",
      messagingSenderId: "test",
      appId: "test",
    },
  },
}));

jest.mock("@/firebase/config", () => ({
  FirebaseAuth: {},
  FirebaseDB: {},
}));

jest.mock("firebase/firestore/lite", () => ({
  collection: jest.fn().mockReturnValue({}),
  doc: jest.fn().mockReturnValue({}),
  setDoc: jest.fn().mockResolvedValue(undefined),
  getDocs: jest.fn().mockResolvedValue({ docs: [] }),
  deleteDoc: jest.fn().mockResolvedValue(undefined),
}));

const renderComponent = (): RenderResult => render(<UpcomingGamesSection />);

describe("UpcomingGamesSection", () => {
  describe("rendering", () => {
    it("should render the Upcoming Games heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "Upcoming Games" })).toBeInTheDocument();
    });

    it("should render the same number of UpcomingGame items as in upcomingGames array", () => {
      renderComponent();
      expect(screen.getAllByRole("article")).toHaveLength(upcomingGames.length);
    });

    it("should render each upcoming game name", () => {
      renderComponent();
      upcomingGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: new RegExp(game.name) })).toBeInTheDocument();
      });
    });
  });
});
