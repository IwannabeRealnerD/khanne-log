import { Suspense } from "react";

import { GlobalTop } from "@/components/Top";
import { GLOBAL_ITEMS_PER_PAGE } from "@/constants/pagination";

import { LineListSection } from "./components/line-list-section";

const LinePage = async (props: PageProps<"/lines">) => {
  const { page } = await props.searchParams;
  return (
    <div>
      <GlobalTop>좋아하는 대사 모음집</GlobalTop>
      <Suspense>
        <LineListSection currentPage={page ? Number(page) : 1} itemsPerPage={GLOBAL_ITEMS_PER_PAGE} />
      </Suspense>
    </div>
  );
};

export default LinePage;
