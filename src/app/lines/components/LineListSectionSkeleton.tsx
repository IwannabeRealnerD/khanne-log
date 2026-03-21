import { FunctionComponent } from "react";

export const LineListSectionSkeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <SkeletonCard lines={5} />
      <SkeletonCard lines={8} />
      <SkeletonCard lines={3} />
    </div>
  );
};

const SkeletonCard = ({ lines }: { lines: number }) => {
  return (
    <div className="rounded-lg border border-border shadow-sm">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-bg-muted" />
            <div className="h-4 w-4 animate-pulse rounded bg-bg-subtle" />
          </div>
          <div className="h-3 w-16 animate-pulse rounded bg-bg-subtle" />
        </div>
        <div className="mt-1.5 h-3 w-40 animate-pulse rounded bg-bg-subtle" />
      </div>
      {/* Body */}
      <div className="border-t border-border bg-bg-subtle px-4 py-4">
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-5 animate-pulse rounded bg-bg-muted"
              style={{ width: `${60 + Math.random() * 40}%` }}
            />
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-full animate-pulse rounded bg-bg-subtle" />
          <div className="h-3.5 w-3/4 animate-pulse rounded bg-bg-subtle" />
        </div>
      </div>
    </div>
  );
};
