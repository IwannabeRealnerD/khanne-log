import { ReactNode } from "react";

interface LineLayoutProps {
  children: ReactNode;
}

const LineLayout = ({ children }: LineLayoutProps) => {
  return <main className="p-3">{children}</main>;
};

export default LineLayout;
