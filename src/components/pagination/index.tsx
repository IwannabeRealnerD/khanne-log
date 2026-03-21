import { FunctionComponent } from "react";
import Link from "next/link";

import { globalCn } from "@/utils/globalCn";

import { generateVisiblePages } from "./generateVisiblePages";

interface GlobalPaginationProps {
  totalPageCount: number;
  currentPage: number;
}

export const GlobalPagination: FunctionComponent<GlobalPaginationProps> = (props) => {
  const pagesToShow = generateVisiblePages({
    currentPage: props.currentPage,
    totalPageCount: props.totalPageCount,
  });

  return (
    <div className="mt-8 mb-5 flex justify-center gap-2">
      {pagesToShow.firstPage && (
        <div className="flex items-center gap-2">
          <Link
            replace
            className="flex size-7 items-center justify-center rounded-md border border-border text-body"
            href={`/lines?page=${pagesToShow.firstPage}`}
          >
            {pagesToShow.firstPage}
          </Link>
          <p className="align-middle text-subtle">...</p>
        </div>
      )}
      {pagesToShow.pages.map((page) => {
        return (
          <Link
            key={page}
            replace
            className={globalCn(
              "flex size-7 items-center justify-center rounded-md border border-border text-body",
              props.currentPage === page && "border-border-accent bg-bg-accent text-accent font-medium"
            )}
            href={`/lines?page=${page}`}
          >
            {page}
          </Link>
        );
      })}
      {pagesToShow.lastPage && (
        <div className="flex items-center gap-2">
          <p className="text-subtle">...</p>
          <Link
            replace
            className="flex size-7 items-center justify-center rounded-md border border-border text-body"
            href={`/lines?page=${pagesToShow.lastPage}`}
          >
            {pagesToShow.lastPage}
          </Link>
        </div>
      )}
    </div>
  );
};
