import { Suspense } from "react";

import { LineListSection } from "./components/line-list-section";
import { LineListSectionSkeleton } from "./components/line-list-section-skeleton";

const LinePage = async (props: PageProps<"/lines">) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <Suspense key={currentPage} fallback={<LineListSectionSkeleton />}>
      <LineListSection currentPage={currentPage} />
    </Suspense>
  );
};

export default LinePage;
