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
    <div className="my-5 flex justify-center gap-2">
      {pagesToShow.firstPage && (
        <div className="flex items-center gap-2">
          <Link
            replace
            className="flex size-7 items-center justify-center rounded-md border-1 border-gray-200 text-sm"
            href={`/lines?page=${pagesToShow.firstPage}`}
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
            replace
            className={globalCn(
              "flex size-7 items-center justify-center rounded-md border-1 border-gray-200 text-sm",
              props.currentPage === page && "text-blue-500"
            )}
            href={`/lines?page=${page}`}
          >
            {page}
          </Link>
        );
      })}
      {pagesToShow.lastPage && (
        <div className="flex items-center gap-2">
          <p className="text-gray-400">...</p>
          <Link
            replace
            className="flex size-7 items-center justify-center rounded-md border-1 border-gray-200 text-sm"
            href={`/lines?page=${pagesToShow.lastPage}`}
          >
            {pagesToShow.lastPage}
          </Link>
        </div>
      )}
    </div>
  );
};
