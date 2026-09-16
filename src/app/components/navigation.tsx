"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { globalCn } from "@/utils/global-cn";

const NAV_ITEMS = [
  { href: "/", label: "Home", segment: null },
  { href: "/lines?page=1", label: "Lines", segment: "lines" },
  { href: "/movies-series?page=1", label: "Reviews", segment: "movies-series" },
] satisfies { href: Route; label: string; segment: string | null }[];

export const Navigation = () => {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <nav aria-label="주요 메뉴" className="flex gap-4">
      {NAV_ITEMS.map((item) => {
        const isCurrent = selectedSegment === item.segment;

        return (
          <Link
            key={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className={globalCn(
              "rounded-sm text-caption text-muted transition-colors duration-150 ease-out hover:text-fg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:text-accent motion-reduce:transition-none",
              isCurrent && "font-medium text-accent hover:text-accent"
            )}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
