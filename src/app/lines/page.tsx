import { Suspense } from "react";

import { LineListSection } from "./components/LineListSection";
import { LineListSectionSkeleton } from "./components/LineListSectionSkeleton";

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
