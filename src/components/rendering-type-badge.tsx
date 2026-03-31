import type { FunctionComponent } from "react";

type RenderingType = "static" | "partial-prerender" | "dynamic";

interface GlobalRenderingTypeBadgeProps {
  type: RenderingType;
}

const RENDERING_TYPE_CONFIG: Record<RenderingType, { icon: string; label: string }> = {
  static: { icon: "○", label: "Static" },
  "partial-prerender": { icon: "◐", label: "Partial Prerender" },
  dynamic: { icon: "λ", label: "Dynamic" },
};

export const GlobalRenderingTypeBadge: FunctionComponent<GlobalRenderingTypeBadgeProps> = (props) => {
  const config = RENDERING_TYPE_CONFIG[props.type];

  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-md border border-border bg-bg-subtle px-3 py-1.5 text-caption text-muted shadow-sm">
      <span>{config.icon}</span>
      <span className="ml-1.5">{config.label}</span>
    </div>
  );
};
