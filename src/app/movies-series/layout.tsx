import { Suspense } from "react";

import { GlobalTop } from "@/components/top";

const MoviesSeriesLayout = async (props: LayoutProps<"/movies-series">) => {
  return (
    <>
      <div className="mb-8 pb-4">
        <GlobalTop>작품 리뷰</GlobalTop>
        <p className="mt-1 text-caption text-muted italic">movies & series reviews</p>
      </div>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default MoviesSeriesLayout;
