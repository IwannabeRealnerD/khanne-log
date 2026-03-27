import { FunctionComponent } from "react";

import { SkeletonCard } from "./components/skeleton-card";

export const LineListSectionSkeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <SkeletonCard lines={7} />
      <SkeletonCard lines={5} />
      <SkeletonCard lines={12} />
    </div>
  );
};
