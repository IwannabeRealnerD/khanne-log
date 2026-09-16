"use client";

import { useEffect, useRef, useState } from "react";

import { globalCn } from "@/utils/global-cn";

import type { RenderingTypeConfig } from "./types";

interface GlobalRenderingTypeBadgeProps {
  config: RenderingTypeConfig;
}

export const GlobalRenderingTypeBadge = ({ config }: GlobalRenderingTypeBadgeProps) => {
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
    <div ref={containerRef} className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div
          className="max-w-72 rounded-md border border-edge bg-surface px-3 py-2.5 shadow-md"
          id="rendering-type-details"
        >
          <p className="text-default text-caption font-medium">{config.summary}</p>
          <ul className="mt-1 list-disc pl-4 text-caption text-muted">
            {config.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        aria-controls="rendering-type-details"
        aria-expanded={isOpen}
        className={globalCn(
          "interactive rounded-md px-3 py-1.5 text-caption text-muted hover:text-fg",
          isOpen &&
            "border-edge-selected bg-bg-accent text-accent hover:border-edge-selected hover:bg-bg-accent hover:text-accent"
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{config.icon}</span>
        <span className="ml-1.5">{config.label}</span>
      </button>
    </div>
  );
};
