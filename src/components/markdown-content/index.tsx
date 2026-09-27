import type { ReactNode } from "react";

import Markdown, { type Components } from "react-markdown";

import { GlobalHeading } from "@/components/heading";
import { globalCn } from "@/utils/global-cn";

import styles from "./markdown-content.module.css";

interface MarkdownContentProps {
  className?: string;
  headingStartLevel: 2 | 3;
  markdown: string;
}

const HEADING_LEVELS = {
  2: [2, 3, 4],
  3: [3, 4, 5],
} as const;

export const GlobalMarkdownContent = ({ className, headingStartLevel, markdown }: MarkdownContentProps) => {
  const [h1Level, h2Level, h3Level] = HEADING_LEVELS[headingStartLevel];
  const renderHeading =
    (level: 2 | 3 | 4 | 5, headingClassName: string) =>
    ({ children }: { children?: ReactNode }) => (
      <GlobalHeading className={headingClassName} level={level}>
        {children}
      </GlobalHeading>
    );
  const components = {
    h1: renderHeading(h1Level, styles.heading1),
    h2: renderHeading(h2Level, styles.heading2),
    h3: renderHeading(h3Level, styles.heading3),
  } satisfies Components;

  return (
    <div className={globalCn("prose prose-sm max-w-none", styles.markdown, className)}>
      <Markdown components={components}>{markdown}</Markdown>
    </div>
  );
};
