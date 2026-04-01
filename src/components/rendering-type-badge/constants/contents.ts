export const ROUTE_RENDERING_CONFIG = {
  "/": {
    icon: "○",
    label: "Static",
    summary: "빌드 시 생성된 정적 페이지",
    details: [
      "네비게이션 링크와 소개 문구만 포함, 배포 시점에 HTML 미리 생성.",
      "외부 데이터 요청 없이 동일한 콘텐츠를 즉시 제공. 로딩 매우 빠름.",
    ],
  },
  "/lines": {
    icon: "◐",
    label: "Partial Prerender",
    summary: "정적 껍데기 + 동적 스트리밍",
    details: [
      "미리 만들어둔 정적 HTML 레이아웃을 즉시 표시.",
      "명대사 목록은 Notion 데이터를 가져오는 동안 스켈레톤 UI 표시 후, 서버 스트리밍으로 채워 넣음.",
      "Notion 데이터는 1시간 캐시, 만료 후 첫 요청 시 백그라운드에서 최신 데이터로 갱신(ISR).",
    ],
  },
} as const;
