import { FunctionComponent } from "react";

import { GLOBAL_INTERNAL_URL } from "@/constants/internal-url";
import { Link } from "@/i18n/navigation";
import { globalCn } from "@/utils/globalCn";

import { internalGenerateVisiblePages } from "./internal/generateVisiblePages";

interface GlobalPaginationProps {
  totalDataCount: number;
  currentPage: number;
}

const ITEMS_PER_PAGE = 3;

export const GlobalPagination: FunctionComponent<GlobalPaginationProps> = (props) => {
  const pagesToShow = internalGenerateVisiblePages({
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage: props.currentPage,
    totalDataCount: props.totalDataCount,
  });
  return (
    <div className="my-5 flex justify-center gap-2">
      {pagesToShow.firstPage && (
        <div className="flex items-center gap-2">
          <Link
            className="flex size-7 items-center justify-center rounded-md border-1 border-gray-200 text-sm"
            href={GLOBAL_INTERNAL_URL.LINES(pagesToShow.firstPage)}
          >
            {pagesToShow.firstPage}
          </Link>
          <p className="align-middle text-gray-400">...</p>
        </div>
      )}
      {pagesToShow.pages.map((page) => {
        return (
          <Link
            key={page}
            className={globalCn(
              "flex size-7 items-center justify-center rounded-md border-1 border-gray-200 text-sm",
              props.currentPage === page && "text-blue-500"
            )}
            href={GLOBAL_INTERNAL_URL.LINES(page)}
          >
            {page}
          </Link>
        );
      })}
      {pagesToShow.lastPage && (
        <div className="flex items-center gap-2">
          <p className="text-gray-400">...</p>
          <Link
            className="flex size-7 items-center justify-center rounded-md border-1 border-gray-200 text-sm"
            href={GLOBAL_INTERNAL_URL.LINES(pagesToShow.lastPage)}
          >
            {pagesToShow.lastPage}
          </Link>
        </div>
      )}
    </div>
  );
};
