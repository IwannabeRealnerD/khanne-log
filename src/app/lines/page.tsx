import { Suspense } from "react";

import { GlobalRenderingTypeBadge, ROUTE_RENDERING_CONFIG } from "@/components/rendering-type-badge";

import { LineListSection } from "./components/line-list-section";
import { LineListSectionSkeleton } from "./components/line-list-section-skeleton";

const LinePage = async (props: PageProps<"/lines">) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <>
      <Suspense key={currentPage} fallback={<LineListSectionSkeleton />}>
        <LineListSection currentPage={currentPage} />
      </Suspense>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/lines"]} />
    </>
  );
};

export default LinePage;
