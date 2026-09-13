import { FunctionComponent } from "react";

import { ReviewSkeletonCard } from "./skeleton-card";

export const ReviewListSectionSkeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <ReviewSkeletonCard />
      <ReviewSkeletonCard />
      <ReviewSkeletonCard />
      <ReviewSkeletonCard />
    </div>
  );
};
