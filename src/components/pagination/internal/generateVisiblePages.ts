import { GLOBAL_ITEMS_PER_PAGE, GLOBAL_PAGINATION_MAX_VISIBLE_PAGES } from "@/constants/pagination";

interface InternalRefinePaginationIndexesArgs {
  currentPage: number;
  totalPageCount: number;
}

export const internalGenerateVisiblePages = ({ currentPage, totalPageCount }: InternalRefinePaginationIndexesArgs) => {
  if (totalPageCount <= GLOBAL_ITEMS_PER_PAGE) {
    return { pages: Array.from({ length: totalPageCount }, (_, index) => index + 1), firstPage: null, lastPage: null };
  }

  const pageOffset = Math.floor(GLOBAL_PAGINATION_MAX_VISIBLE_PAGES / 2);
  let startPage = Math.max(1, currentPage - pageOffset);
  let endPage = startPage + GLOBAL_PAGINATION_MAX_VISIBLE_PAGES - 1;

  if (endPage > totalPageCount) {
    endPage = totalPageCount;
    startPage = Math.max(1, endPage - GLOBAL_PAGINATION_MAX_VISIBLE_PAGES + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  const firstPage = (() => {
    if (!pages.includes(1)) {
      return 1;
    }
    return null;
  })();

  const lastPage = (() => {
    if (!pages.includes(totalPageCount)) {
      return totalPageCount;
    }
    return null;
  })();
  return { pages, firstPage, lastPage };
};
