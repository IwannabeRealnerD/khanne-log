import { Suspense } from "react";

import { GlobalHeading } from "@/components/heading";
import { GlobalRenderingTypeBadge, ROUTE_RENDERING_CONFIG } from "@/components/rendering-type-badge";

import { ReviewListSection } from "./components/review-list-section";
import { ReviewListSectionSkeleton } from "./components/review-list-section-skeleton";

const MoviesSeriesPageContent = async (props: Pick<PageProps<"/movies-series">, "searchParams">) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return <ReviewListSection currentPage={currentPage} />;
};

const MoviesSeriesPage = (props: PageProps<"/movies-series">) => {
  return (
    <>
      <div className="mb-8 pb-4">
        <GlobalHeading level={1}>작품 리뷰</GlobalHeading>
        <p className="mt-1 text-caption text-muted italic">movies &amp; series reviews</p>
      </div>
      <Suspense fallback={<ReviewListSectionSkeleton />}>
        <MoviesSeriesPageContent searchParams={props.searchParams} />
      </Suspense>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/movies-series"]} />
    </>
  );
};

export default MoviesSeriesPage;
