import { Suspense } from "react";

import { GlobalPageHeading } from "@/components/page-heading";

const MoviesSeriesLayout = async (props: LayoutProps<"/movies-series">) => {
  return (
    <>
      <div className="mb-8 pb-4">
        <GlobalPageHeading>작품 리뷰</GlobalPageHeading>
        <p className="mt-1 text-caption text-muted italic">movies & series reviews</p>
      </div>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default MoviesSeriesLayout;
