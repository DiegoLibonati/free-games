import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Alert } from "@/types/app";
import type { UIState } from "@/types/states";

const initialState: UIState = {
  navBar: {
    isOpen: false,
  },
  filters: {
    categories: {
      isOpen: false,
    },
  },
  alert: {
    isOpen: false,
    type: "",
    title: "",
    message: "",
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openNavBar: (state) => {
      state.navBar.isOpen = true;
    },
    closeNavBar: (state) => {
      state.navBar.isOpen = false;
    },
    openFilterCategories: (state) => {
      state.filters.categories.isOpen = true;
    },
    closeFilterCategories: (state) => {
      state.filters.categories.isOpen = false;
    },
    openAlert: (state, action: PayloadAction<Alert>) => {
      const alert = action.payload;

      state.alert = alert;
    },
    closeAlert: (state) => {
      state.alert.isOpen = false;
      state.alert.message = "";
      state.alert.title = "";
      state.alert.type = "";
    },
  },
});

export const {
  openNavBar,
  closeNavBar,
  openFilterCategories,
  closeFilterCategories,
  openAlert,
  closeAlert,
} = uiSlice.actions;

export default uiSlice.reducer;
