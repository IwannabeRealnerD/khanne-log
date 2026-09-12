export const SkeletonCard = () => {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm">
      <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-40 animate-pulse rounded bg-bg-muted" />
            <div className="h-4 w-4 animate-pulse rounded bg-bg-subtle" />
          </div>
          <div className="mt-1.5 h-3 w-40 animate-pulse rounded bg-bg-subtle" />
        </div>
        <div className="h-3 w-16 shrink-0 animate-pulse rounded bg-bg-subtle" />
      </div>
    </div>
  );
};
