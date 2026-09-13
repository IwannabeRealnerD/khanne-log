import { FunctionComponent, ReactNode } from "react";

interface GlobalPageHeadingProps {
  children: ReactNode;
}

export const GlobalPageHeading: FunctionComponent<GlobalPageHeadingProps> = ({ children }) => {
  return <h2 className="text-h2 font-bold tracking-tight text-fg">{children}</h2>;
};
