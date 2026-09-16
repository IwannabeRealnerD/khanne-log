import { Suspense } from "react";

import { GlobalRenderingTypeBadge, ROUTE_RENDERING_CONFIG } from "@/components/rendering-type-badge";

import { LineListSection } from "./components/line-list-section";
import { LineListSectionSkeleton } from "./components/line-list-section-skeleton";

const LinePageContent = async (props: Pick<PageProps<"/lines">, "searchParams">) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return <LineListSection currentPage={currentPage} />;
};

const LinePage = (props: PageProps<"/lines">) => {
  return (
    <>
      <Suspense fallback={<LineListSectionSkeleton />}>
        <LinePageContent searchParams={props.searchParams} />
      </Suspense>
      <GlobalRenderingTypeBadge config={ROUTE_RENDERING_CONFIG["/lines"]} />
    </>
  );
};

export default LinePage;
