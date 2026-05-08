import { FunctionComponent } from "react";

import { SkeletonCard } from "./components/skeleton-card";

export const ReviewListSectionSkeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
