import { HeaderPresentationProps } from "@/types/props";

import "@/components/HeaderPresentation/HeaderPresentation.css";

const HeaderPresentation = ({ children }: HeaderPresentationProps) => {
  return <h1 className="header-presentation">{children}</h1>;
};

export default HeaderPresentation;
