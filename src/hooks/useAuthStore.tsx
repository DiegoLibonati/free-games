import { User, UserLogin, UserLoginWithoutUsername } from "@src/entities/app";
import { UseAuthStore } from "@src/entities/hooks";

import {
  startCreatingUserWithEmail,
  startGettingImagesToLoginAndRegisterPage,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogOutWithButton,
} from "@src/features/auth/thunks";
import { login } from "@src/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "@src/app/hooks";

export const useAuthStore = (): UseAuthStore => {
  const { user, auth, images } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = (): void => {
    dispatch(startLogOutWithButton());
  };

  const handleLogin = (user: User): void => {
    dispatch(login(user));
  };

  const handleLoginWithEmailAndPassword = (
    user: UserLoginWithoutUsername
  ): void => {
    dispatch(startLoginWithEmailPassword(user));
  };

  const handleLoginWithGoogle = (): void => {
    dispatch(startGoogleSignIn());
  };

  const handleCreateNewUserWithEmailAndPassword = (user: UserLogin): void => {
    dispatch(startCreatingUserWithEmail(user));
  };

  const handleGetImages = () => {
    dispatch(startGettingImagesToLoginAndRegisterPage());
  };

  return {
    images: images.images,
    isLoadingImages: images.isLoadingImages,
    isChecking: auth.isChecking,
    status: auth.status,
    errorMessage: auth.errorMessage,
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    handleLogOut: handleLogOut,
    handleLogin: handleLogin,
    handleLoginWithEmailAndPassword: handleLoginWithEmailAndPassword,
    handleLoginWithGoogle: handleLoginWithGoogle,
    handleCreateNewUserWithEmailAndPassword:
      handleCreateNewUserWithEmailAndPassword,
    handleGetImages: handleGetImages,
  };
};
