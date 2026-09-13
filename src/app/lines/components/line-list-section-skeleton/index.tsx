import { FunctionComponent } from "react";

import { LineSkeletonCard } from "./skeleton-card";

export const LineListSectionSkeleton: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <LineSkeletonCard lines={7} />
      <LineSkeletonCard lines={5} />
      <LineSkeletonCard lines={12} />
    </div>
  );
};
