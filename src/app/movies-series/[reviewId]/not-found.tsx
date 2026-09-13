import Link from "next/link";

import { GLOBAL_INTERNAL_URL } from "@/constants/internal-url";

const ReviewDetailNotFound = () => {
  return (
    <div className="rounded-lg border border-border bg-bg-subtle px-6 py-10 text-center">
      <h1 className="text-h3 font-semibold text-fg">리뷰를 찾을 수 없습니다</h1>
      <p className="mt-2 text-body text-muted">존재하지 않거나 아직 공개되지 않은 리뷰입니다.</p>
      <Link
        className="mt-5 inline-flex rounded-md border border-border bg-surface px-3 py-2 text-caption text-muted transition-colors hover:border-border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        href={GLOBAL_INTERNAL_URL.MOVIES_SERIES(1)}
      >
        리뷰 목록으로 돌아가기
      </Link>
    </div>
  );
};

export default ReviewDetailNotFound;
