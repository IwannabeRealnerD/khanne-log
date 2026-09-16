export const LineSkeletonCard = ({ lines }: { lines: number }) => {
  const quoteWidth = 60 + ((lines * 7) % 40);

  return (
    <div className="rounded-lg border border-edge shadow-sm">
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
      {/* Quote & Scene Description */}
      <div className="border-t border-edge bg-bg-subtle px-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="h-5 animate-pulse rounded bg-bg-muted" style={{ width: `${quoteWidth}%` }} />
        </div>
      </div>
      {/* Comment */}
      <div className="border-t border-edge px-4 py-3">
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i + 1} className="h-3.5 w-full animate-pulse rounded bg-bg-subtle" />
          ))}
        </div>
      </div>
    </div>
  );
};
