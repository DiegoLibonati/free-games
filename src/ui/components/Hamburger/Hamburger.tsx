import { useUiStore } from "@src/hooks/useUiStore";

import "@src/ui/components/Hamburger/Hamburger.css";

export const Hamburger = (): JSX.Element => {
  const { isNavBarOpen, handleOpenNavBar, handleCloseNavBar } = useUiStore();

  return (
    <div
      onClick={isNavBarOpen ? handleCloseNavBar : handleOpenNavBar}
      className={isNavBarOpen ? "hamburger hamburger--open" : "hamburger"}
    >
      <span className="hamburger__span"></span>
      <span className="hamburger__span"></span>
      <span className="hamburger__span"></span>
    </div>
  );
};
