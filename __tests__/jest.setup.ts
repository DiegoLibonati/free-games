import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

import { mockEnvs } from "@tests/__mocks__/envs.mock";
import { mockAssets } from "@tests/__mocks__/assets.mock";

Object.assign(globalThis, { TextEncoder, TextDecoder });

globalThis.fetch = jest.fn();

jest.mock("@/constants/envs.ts", () => {
  return { __esModule: true, default: mockEnvs };
});

jest.mock("@/assets/export", () => ({
  __esModule: true,
  default: mockAssets,
}));
