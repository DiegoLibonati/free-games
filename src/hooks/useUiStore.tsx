import { Alert } from "@src/entities/entities";

import {
  openNavBar,
  closeNavBar,
  openFilterCategories,
  closeFilterCategories,
  closeAlert,
  openAlert,
} from "@src/store/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@src/constants/redux";

type UseUiStore = {
  alert: Alert;
  isNavBarOpen: boolean;
  isFilterCategoriesOpen: boolean;
  handleOpenNavBar: () => void;
  handleCloseNavBar: () => void;
  handleOpenFilterCategories: () => void;
  handleCloseFilterCategories: () => void;
  handleOpenAlert: (alert: Alert) => void;
  handleCloseAlert: () => void;
};

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
