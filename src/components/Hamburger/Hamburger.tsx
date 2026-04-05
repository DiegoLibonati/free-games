import type { JSX } from "react";

import { useUiStore } from "@/hooks/useUiStore";

import "@/components/Hamburger/Hamburger.css";

const Hamburger = (): JSX.Element => {
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

export default Hamburger;
