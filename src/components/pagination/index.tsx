import { FunctionComponent } from "react";
import type { Route } from "next";
import Link from "next/link";

import { generateVisiblePages } from "./generate-visible-pages";

export { calculateTotalPageCount } from "./calculate-total-page-count";

interface GlobalPaginationProps {
  totalPageCount: number;
  currentPage: number;
  basePath?: Route;
}

const PAGINATION_LINK_CLASS_NAME =
  "interactive flex size-7 items-center justify-center rounded-md text-body text-muted hover:text-fg";

export const GlobalPagination: FunctionComponent<GlobalPaginationProps> = (props) => {
  const basePath = props.basePath ?? "/lines";
  const pagesToShow = generateVisiblePages({
    currentPage: props.currentPage,
    totalPageCount: props.totalPageCount,
  });

  return (
    <nav aria-label="페이지 탐색" className="mt-8 mb-5 flex justify-center gap-2">
      {pagesToShow.firstPage && (
        <div className="flex items-center gap-2">
          <Link
            replace
            className={PAGINATION_LINK_CLASS_NAME}
            href={`${basePath}?page=${pagesToShow.firstPage}` as Route}
          >
            {pagesToShow.firstPage}
          </Link>
          <p className="align-middle text-subtle">...</p>
        </div>
      )}
      {pagesToShow.pages.map((page) => {
        if (props.currentPage === page) {
          return (
            <span
              key={page}
              aria-current="page"
              className="flex size-7 items-center justify-center rounded-md border border-edge-selected bg-bg-accent text-body font-medium text-accent shadow-sm"
            >
              {page}
            </span>
          );
        }

        return (
          <Link key={page} replace className={PAGINATION_LINK_CLASS_NAME} href={`${basePath}?page=${page}` as Route}>
            {page}
          </Link>
        );
      })}
      {pagesToShow.lastPage && (
        <div className="flex items-center gap-2">
          <p className="text-subtle">...</p>
          <Link
            replace
            className={PAGINATION_LINK_CLASS_NAME}
            href={`${basePath}?page=${pagesToShow.lastPage}` as Route}
          >
            {pagesToShow.lastPage}
          </Link>
        </div>
      )}
    </nav>
  );
};
