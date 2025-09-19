import { GeneralProps } from "@src/entities/entities";

import "@src/auth/components/HeaderPresentation/HeaderPresentation.css";

interface HeaderPresentationProps extends GeneralProps {}

export const HeaderPresentation = ({
  children,
}: HeaderPresentationProps): JSX.Element => {
  return <h1 className="header-presentation">{children}</h1>;
};
