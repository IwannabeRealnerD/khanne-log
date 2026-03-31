import { Suspense } from "react";

import { GlobalRenderingTypeBadge } from "@/components/rendering-type-badge";

import { LineListSection } from "./components/line-list-section";
import { LineListSectionSkeleton } from "./components/line-list-section-skeleton";

const LinePage = async (props: PageProps<"/lines">) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <>
      <GlobalRenderingTypeBadge type="partial-prerender" />
      <Suspense key={currentPage} fallback={<LineListSectionSkeleton />}>
        <LineListSection currentPage={currentPage} />
      </Suspense>
    </>
  );
};

export default LinePage;
