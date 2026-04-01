"use client";

import { useEffect, useRef, useState } from "react";

type RenderingType = "static" | "partial-prerender" | "dynamic";

interface GlobalRenderingTypeBadgeProps {
  type: RenderingType;
}

const RENDERING_TYPE_CONFIG: Record<
  RenderingType,
  { icon: string; label: string; summary: string; details: string[] }
> = {
  static: {
    icon: "○",
    label: "Static",
    summary: "빌드 시 생성된 정적 페이지",
    details: [
      "네비게이션 링크와 소개 문구만 포함, 배포 시점에 HTML 미리 생성.",
      "외부 데이터 요청 없이 동일한 콘텐츠를 즉시 제공. 로딩 매우 빠름.",
    ],
  },
  "partial-prerender": {
    icon: "◐",
    label: "Partial Prerender",
    summary: "정적 껍데기 + 동적 스트리밍",
    details: [
      "미리 만들어둔 정적 HTML 레이아웃을 즉시 표시.",
      "명대사 목록은 Notion 데이터를 가져오는 동안 스켈레톤 UI 표시 후, 서버 스트리밍으로 채워 넣음.",
      "Notion 데이터는 1시간 캐시, 만료 후 첫 요청 시 백그라운드에서 최신 데이터로 갱신(ISR).",
    ],
  },
  dynamic: {
    icon: "λ",
    label: "Dynamic",
    summary: "요청마다 서버에서 생성",
    details: [
      "방문할 때마다 서버에서 HTML을 새로 생성하여 응답.",
      "항상 최신 데이터 반영. 서버 처리 시간만큼 로딩 발생 가능.",
    ],
  },
};

export const GlobalRenderingTypeBadge = (props: GlobalRenderingTypeBadgeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const config = RENDERING_TYPE_CONFIG[props.type];

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
