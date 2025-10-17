import { UserLogin, UserLoginWithoutUsername } from "@src/entities/app";

import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  signInWithGoogle,
} from "@src/firebase/providers";

import {
  setImagesLoginAndRegister,
  setLoadingImages,
  checkingCredentials,
  logout,
  login,
} from "@src/features/auth/authSlice";

import { getGames } from "@src/api/get/getGames";

import { AppDispatch } from "@src/app/store";

export const startGettingImagesToLoginAndRegisterPage = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingImages(true));

      const data = await getGames();

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

    if (!result.ok) {
      return dispatch(logout());
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmail = ({
  email,
  password,
  username,
}: UserLogin) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmail(email, password, username);

    if (!result.ok) {
      return dispatch(logout());
    }

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({
  email,
  password,
}: UserLoginWithoutUsername) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword(email, password);

    if (!result.ok) {
      return dispatch(logout());
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
