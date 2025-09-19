import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthState, User } from "@src/entities/entities";

const initialState: AuthState = {
  images: { images: [], isLoadingImages: false },
  auth: { isChecking: false, status: "checking", errorMessage: "" },
  user: { uid: "", email: "", displayName: "", photoURL: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setImagesLoginAndRegister: (state, action: PayloadAction<string[]>) => {
      const images = action.payload;

      state.images.images = images;
    },
    setLoadingImages: (state, action: PayloadAction<boolean>) => {
      const boolean = action.payload;

      state.images.isLoadingImages = boolean;
    },
    login: (state, action: PayloadAction<User>) => {
      const uid = action.payload.uid;
      const email = action.payload.email;
      const displayName = action.payload.displayName;
      const photoURL = action.payload.photoURL;

      state.auth.status = "authenticated";
      state.auth.isChecking = false;

      state.user.uid = uid;
      state.user.email = email;
      state.user.displayName = displayName;
      state.user.photoURL = photoURL;
    },
    logout: (state) => {
      state.auth.status = "not-authenticated";
      state.auth.isChecking = false;
      state.auth.errorMessage = "";

      state.user.uid = "";
      state.user.email = "";
      state.user.displayName = "";
      state.user.photoURL = "";
    },
    checkingCredentials: (state) => {
      state.auth.status = "checking";
      state.auth.isChecking = true;
    },
  },
});

export const {
  setImagesLoginAndRegister,
  setLoadingImages,
  login,
  logout,
  checkingCredentials,
} = authSlice.actions;

export default authSlice.reducer;
