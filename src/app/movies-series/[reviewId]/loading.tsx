const ReviewDetailLoading = () => {
  return (
    <div aria-label="리뷰를 불러오는 중" className="animate-pulse">
      <div className="h-4 w-20 rounded bg-bg-muted" />
      <div className="mt-6 border-b border-border pb-8">
        <div className="h-9 w-3/5 rounded bg-bg-muted" />
        <div className="mt-3 h-5 w-2/5 rounded bg-bg-subtle" />
        <div className="mt-5 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-bg-subtle" />
          <div className="h-6 w-24 rounded-full bg-bg-subtle" />
          <div className="h-6 w-20 rounded-full bg-bg-subtle" />
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="h-5 w-1/3 rounded bg-bg-muted" />
        <div className="h-4 w-full rounded bg-bg-subtle" />
        <div className="h-4 w-11/12 rounded bg-bg-subtle" />
        <div className="h-4 w-4/5 rounded bg-bg-subtle" />
      </div>
    </div>
  );
};

export default ReviewDetailLoading;
