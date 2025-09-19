import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import {
  LoginWithEmailPassword,
  RegisterUserWithEmail,
  SignInWithGoogle,
} from "@src/entities/entities";

import { FirebaseAuth } from "@src/firebase/config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<SignInWithGoogle> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, photoURL, uid, email } = result.user;

    return {
      ok: true,
      displayName: displayName!,
      email: email!,
      photoURL: photoURL!,
      uid: uid,
    };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorCode: error.code,
        errorMessage: error.message,
      };
    }

    return {
      ok: false,
      errorCode: "unknown_error",
      errorMessage: "An unknown error occurred.",
    };
  }
};

export const registerUserWithEmail = async (
  email: string,
  password: string,
  username: string
): Promise<RegisterUserWithEmail> => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    await updateProfile(FirebaseAuth.currentUser!, { displayName: username });

    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      displayName: displayName!,
      email: email!,
      photoURL: photoURL!,
      uid: uid!,
    };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorCode: error.code,
        errorMessage: error.message,
      };
    }

    return {
      ok: false,
      errorCode: "unknown_error",
      errorMessage: "An unknown error occurred.",
    };
  }
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
): Promise<LoginWithEmailPassword> => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      displayName: displayName!,
      email: email,
      photoURL: photoURL!,
      uid: uid!,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorCode: error.code,
        errorMessage: error.message,
      };
    }

    return {
      ok: false,
      errorCode: "unknown_error",
      errorMessage: "An unknown error occurred.",
    };
  }
};

export const logoutFirebase = async (): Promise<void> => {
  return await FirebaseAuth.signOut();
};