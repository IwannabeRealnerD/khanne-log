import type { HTMLAttributes } from "react";

import { globalCn } from "@/utils/global-cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface GlobalHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
}

const HEADING_TAG_BY_LEVEL = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

const HEADING_CLASS_NAME_BY_LEVEL: Record<HeadingLevel, string> = {
  1: "heading-level-1",
  2: "heading-level-2",
  3: "heading-level-3",
  4: "heading-level-4",
  5: "heading-level-4",
  6: "heading-level-4",
};

export const GlobalHeading = ({ className, level, ...props }: GlobalHeadingProps) => {
  const HeadingTag = HEADING_TAG_BY_LEVEL[level];

  return <HeadingTag className={globalCn(HEADING_CLASS_NAME_BY_LEVEL[level], className)} {...props} />;
};
