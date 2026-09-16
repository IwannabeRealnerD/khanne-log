import { Suspense } from "react";

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
      <Suspense fallback={<ReviewListSectionSkeleton />}>
        <MoviesSeriesPageContent searchParams={props.searchParams} />
      </Suspense>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/movies-series"]} />
    </>
  );
};

export default MoviesSeriesPage;
