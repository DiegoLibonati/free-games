import { HeaderPresentationProps } from "@src/entities/props";

import "@src/components/HeaderPresentation/HeaderPresentation.css";

export const HeaderPresentation = ({
  children,
}: HeaderPresentationProps): JSX.Element => {
  return <h1 className="header-presentation">{children}</h1>;
};
