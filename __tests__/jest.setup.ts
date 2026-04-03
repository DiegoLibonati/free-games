import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

import { mockEnvs } from "@tests/__mocks__/envs.mock";
import { mockAssets } from "@tests/__mocks__/assets.mock";

const mockFetch = jest.fn();

const mockFirebaseConfigSignOut = jest.fn();

const mockFirebaseProvidersSignInWithGoogle = jest.fn();
const mockFirebaseProvidersRegisterUserWithEmail = jest.fn();
const mockFirebaseProvidersLoginWithEmailPassword = jest.fn();
const mockFirebaseProvidersLogoutFirebase = jest.fn();

const mockFirebaseFirestoreCollection = jest.fn();
const mockFirebaseFirestoreGetDocs = jest.fn();
const mockFirebaseFirestoreDoc = jest.fn();
const mockFirebaseFirestoreSetDoc = jest.fn();
const mockFirebaseFirestoreDeleteDoc = jest.fn();

const mockSweetAlert2Fire = jest.fn();

Object.assign(globalThis, { TextEncoder, TextDecoder });

globalThis.fetch = mockFetch;

jest.mock("@/constants/envs.ts", () => {
  return { __esModule: true, default: mockEnvs };
});

jest.mock("@/assets/export", () => ({
  __esModule: true,
  default: mockAssets,
}));

jest.mock("@/firebase/config", () => ({
  FirebaseDB: {},
  FirebaseAuth: { signOut: mockFirebaseConfigSignOut },
}));

jest.mock("@/firebase/providers", () => ({
  signInWithGoogle: mockFirebaseProvidersSignInWithGoogle,
  registerUserWithEmail: mockFirebaseProvidersRegisterUserWithEmail,
  loginWithEmailPassword: mockFirebaseProvidersLoginWithEmailPassword,
  logoutFirebase: mockFirebaseProvidersLogoutFirebase,
}));

jest.mock("firebase/firestore/lite", () => ({
  collection: mockFirebaseFirestoreCollection,
  getDocs: mockFirebaseFirestoreGetDocs,
  doc: mockFirebaseFirestoreDoc,
  setDoc: mockFirebaseFirestoreSetDoc,
  deleteDoc: mockFirebaseFirestoreDeleteDoc,
}));

jest.mock("sweetalert2", () => ({ __esModule: true, default: { fire: mockSweetAlert2Fire } }));

beforeEach(() => {
  const firestore = jest.requireMock("firebase/firestore/lite");
  firestore.getDocs.mockResolvedValue({ docs: [] });
});
