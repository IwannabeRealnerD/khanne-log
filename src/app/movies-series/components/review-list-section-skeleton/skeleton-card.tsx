export const ReviewSkeletonCard = () => {
  return (
    <div className="rounded-lg border border-edge bg-surface shadow-sm">
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-2/5 animate-pulse rounded bg-bg-muted" />
              <div className="h-4 w-4 animate-pulse rounded bg-bg-subtle" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-bg-subtle" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-bg-subtle" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-bg-subtle" />
            </div>
          </div>
          <div className="h-3 w-16 shrink-0 animate-pulse rounded bg-bg-subtle" />
        </div>
      </div>
    </div>
  );
};
