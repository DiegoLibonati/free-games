import { Alert } from "@src/entities/app";

import { UseUiStore } from "@src/entities/hooks";

import {
  openNavBar,
  closeNavBar,
  openFilterCategories,
  closeFilterCategories,
  closeAlert,
  openAlert,
} from "@src/features/ui/uiSlice";

import { useAppDispatch, useAppSelector } from "@src/app/hooks";

export const useUiStore = (): UseUiStore => {
  const dispatch = useAppDispatch();

  const { navBar, filters, alert } = useAppSelector((state) => state.ui);

  const handleOpenNavBar = (): void => {
    dispatch(openNavBar());
  };

  const handleCloseNavBar = (): void => {
    dispatch(closeNavBar());
  };

  const handleOpenFilterCategories = (): void => {
    dispatch(openFilterCategories());
  };

  const handleCloseFilterCategories = (): void => {
    dispatch(closeFilterCategories());
  };

  const handleOpenAlert = (alert: Alert): void => {
    dispatch(openAlert(alert));
  };

  const handleCloseAlert = (): void => {
    dispatch(closeAlert());
  };

  return {
    alert: alert,
    isNavBarOpen: navBar.isOpen,
    isFilterCategoriesOpen: filters.categories.isOpen,
    handleOpenNavBar: handleOpenNavBar,
    handleCloseNavBar: handleCloseNavBar,
    handleOpenFilterCategories: handleOpenFilterCategories,
    handleCloseFilterCategories: handleCloseFilterCategories,
    handleOpenAlert: handleOpenAlert,
    handleCloseAlert: handleCloseAlert,
  };
};
