import type { User, UserLogin, UserLoginWithoutUsername } from "@/types/app";
import type { UseAuthStore } from "@/types/hooks";

import {
  startCreatingUserWithEmail,
  startGettingImagesToLoginAndRegisterPage,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogOutWithButton,
} from "@/features/auth/thunks";
import { login } from "@/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

export const useAuthStore = (): UseAuthStore => {
  const { user, auth, images } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = (): void => {
    void dispatch(startLogOutWithButton());
  };

  const handleLogin = (user: User): void => {
    dispatch(login(user));
  };

  const handleLoginWithEmailAndPassword = (user: UserLoginWithoutUsername): void => {
    void dispatch(startLoginWithEmailPassword(user));
  };

  const handleLoginWithGoogle = (): void => {
    void dispatch(startGoogleSignIn());
  };

  const handleCreateNewUserWithEmailAndPassword = (user: UserLogin): void => {
    void dispatch(startCreatingUserWithEmail(user));
  };

  const handleGetImages = (): void => {
    void dispatch(startGettingImagesToLoginAndRegisterPage());
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
    handleCreateNewUserWithEmailAndPassword: handleCreateNewUserWithEmailAndPassword,
    handleGetImages: handleGetImages,
  };
};
