import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";
import { GLOBAL_ITEMS_PER_PAGE } from "@/constants/pagination";

import { LineListSection } from "./components/line-list-section";

interface LinePageProps {
  searchParams: Promise<{ page?: string }>;
}

const LinePage = async (props: LinePageProps) => {
  const { page } = await props.searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <div>
      <GlobalTop>좋아하는 대사 모음집</GlobalTop>
      <Suspense>
        <LineListSection currentPage={currentPage} itemsPerPage={GLOBAL_ITEMS_PER_PAGE} />
      </Suspense>
    </div>
  );
};

export default LinePage;
