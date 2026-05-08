"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { RenderingTypeConfig } from "./types";

export const GlobalRenderingTypeBadge = ({ config }: { config: RenderingTypeConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutsideWhenOpened = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideWhenOpened);
    return () => document.removeEventListener("mousedown", handleClickOutsideWhenOpened);
  }, [isOpen]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div ref={containerRef} className="max-w-72 rounded-md border border-border bg-surface px-3 py-2.5 shadow-md">
          <p className="text-default text-caption font-medium">{config.summary}</p>
          <ul className="mt-1 list-disc pl-4 text-caption text-muted">
            {config.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <Link href="/hi">hi</Link>
      <button
        className="rounded-md border border-border bg-bg-subtle px-3 py-1.5 text-caption text-muted shadow-sm transition-colors hover:bg-bg-muted"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{config.icon}</span>
        <span className="ml-1.5">{config.label}</span>
      </button>
    </div>
  );
};
