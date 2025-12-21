import { FunctionComponent } from "react";

export const LineListSectionSkeleton: FunctionComponent = () => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex flex-col gap-6">
        <SkeletonItem1 />
        <SkeletonItem2 />
        <SkeletonItem3 />
      </div>
    </div>
  );
};

const SkeletonItem1 = () => {
  return (
    <div className="flex h-100 flex-col gap-3 rounded-xl border border-gray-300 p-3">
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-2/6 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
    </div>
  );
};

const SkeletonItem2 = () => {
  return (
    <div className="flex h-60 flex-col gap-3 rounded-xl border border-gray-300 p-3">
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-1/6 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-2/5 animate-pulse rounded bg-gray-100" />
    </div>
  );
};

const SkeletonItem3 = () => {
  return (
    <div className="flex h-40 flex-col gap-3 rounded-xl border border-gray-300 p-3">
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
    </div>
  );
};
