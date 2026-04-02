import { UserLogin, UserLoginWithoutUsername } from "@/types/app";

import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  signInWithGoogle,
} from "@/firebase/providers";

import {
  setImagesLoginAndRegister,
  setLoadingImages,
  checkingCredentials,
  logout,
  login,
  setError,
} from "@/features/auth/authSlice";

import { gamesService } from "@/services/gamesService";

import { AppDispatch } from "@/app/store";

export const startGettingImagesToLoginAndRegisterPage = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingImages(true));

      const data = await gamesService.getAll();

      const dataSlice = data.slice(0, 3);

      const images = dataSlice.map((game) => game.thumbnail);

      dispatch(setImagesLoginAndRegister(images));
      dispatch(setLoadingImages(false));
    } catch (error) {
      console.error(error);
    }
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok && result.errorMessage) dispatch(setError(result.errorMessage));

    if (!result.ok) {
      dispatch(logout());
      return;
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmail = ({ email, password, username }: UserLogin) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmail(email, password, username);

    if (!result.ok && result.errorMessage) dispatch(setError(result.errorMessage));

    if (!result.ok) {
      dispatch(logout());
      return;
    }

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }: UserLoginWithoutUsername) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword(email, password);

    if (!result.ok && result.errorMessage) dispatch(setError(result.errorMessage));

    if (!result.ok) {
      dispatch(logout());
      return;
    }

    dispatch(login(result));
  };
};

export const startLogOutWithButton = () => {
  return async (dispatch: AppDispatch) => {
    await logoutFirebase();

    return dispatch(logout());
  };
};
