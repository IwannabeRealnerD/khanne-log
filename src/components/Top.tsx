import { FunctionComponent, ReactNode } from "react";

interface GlobalTopProps {
  children: ReactNode;
}

export const GlobalTop: FunctionComponent<GlobalTopProps> = ({ children }) => {
  return <div className="text-2xl font-bold">{children}</div>;
};
