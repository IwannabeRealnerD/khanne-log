interface InternalRefinePaginationIndexesArgs {
  itemsPerPage: number;
  currentPage: number;
  totalDataCount: number;
}

const MAX_PAGE_TO_SHOW = 5;

export const internalGenerateVisiblePages = ({
  itemsPerPage,
  currentPage,
  totalDataCount,
}: InternalRefinePaginationIndexesArgs) => {
  const totalPages = Math.ceil(totalDataCount / itemsPerPage);

  if (totalPages <= MAX_PAGE_TO_SHOW) {
    return { pages: Array.from({ length: totalPages }, (_, index) => index + 1), firstPage: null, lastPage: null };
  }

  const pageOffset = Math.floor(MAX_PAGE_TO_SHOW / 2);
  let startPage = Math.max(1, currentPage - pageOffset);
  let endPage = startPage + MAX_PAGE_TO_SHOW - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_PAGE_TO_SHOW + 1);
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
    if (!pages.includes(totalPages)) {
      return totalPages;
    }
    return null;
  })();
  return { pages, firstPage, lastPage };
};
