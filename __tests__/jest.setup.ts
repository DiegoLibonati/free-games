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

jest.mock("@/firebase/config", () => ({
  FirebaseDB: {},
  FirebaseAuth: { signOut: jest.fn() },
}));

jest.mock("@/firebase/providers", () => ({
  signInWithGoogle: jest.fn(),
  registerUserWithEmail: jest.fn(),
  loginWithEmailPassword: jest.fn(),
  logoutFirebase: jest.fn(),
}));

jest.mock("firebase/firestore/lite", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

jest.mock("sweetalert2", () => ({ __esModule: true, default: { fire: jest.fn() } }));

beforeEach(() => {
  const firestore = jest.requireMock("firebase/firestore/lite");
  firestore.getDocs.mockResolvedValue({ docs: [] });
});
