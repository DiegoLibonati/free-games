import type { JSX } from "react";
import type { HeaderPresentationProps } from "@/types/props";

import "@/components/HeaderPresentation/HeaderPresentation.css";

const HeaderPresentation = ({ children }: HeaderPresentationProps): JSX.Element => {
  return <h1 className="header-presentation">{children}</h1>;
};

export default HeaderPresentation;
