import "@testing-library/jest-dom";

import { mockConfig } from "./jest.constants";

jest.mock("../src/constants/config.ts", () => ({
  get CONFIG() {
    return mockConfig;
  },
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));
