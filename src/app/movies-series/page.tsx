import { Suspense } from "react";

import { GlobalRenderingTypeBadge, ROUTE_RENDERING_CONFIG } from "@/components/rendering-type-badge";

import { ReviewListSection } from "./components/review-list-section";
import { ReviewListSectionSkeleton } from "./components/review-list-section-skeleton";

const MoviesSeriesPage = async (props: PageProps<"/movies-series">) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <>
      <Suspense key={currentPage} fallback={<ReviewListSectionSkeleton />}>
        <ReviewListSection currentPage={currentPage} />
      </Suspense>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/movies-series"]} />
    </>
  );
};

export default MoviesSeriesPage;
