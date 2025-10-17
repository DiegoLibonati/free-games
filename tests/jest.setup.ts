import "@testing-library/jest-dom";

jest.mock("@src/constants/envs.ts", () => {
  const { mockConfig } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockConfig };
});

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));
