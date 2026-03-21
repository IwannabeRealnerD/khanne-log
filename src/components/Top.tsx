import { FunctionComponent, ReactNode } from "react";

interface GlobalTopProps {
  children: ReactNode;
}

export const GlobalTop: FunctionComponent<GlobalTopProps> = ({ children }) => {
  return <h2 className="text-h2 font-bold tracking-tight text-fg">{children}</h2>;
};
