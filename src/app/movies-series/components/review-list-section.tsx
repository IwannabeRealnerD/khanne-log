import Link from "next/link";

import { GlobalOttBadge } from "@/components/ott-badge";
import { calculateTotalPageCount, GlobalPagination } from "@/components/pagination";
import { GLOBAL_DATABASE_NAME } from "@/constants/database-name";
import { GLOBAL_INTERNAL_URL } from "@/constants/internal-url";
import { GLOBAL_REVIEWS_ITEMS_PER_PAGE } from "@/constants/pagination";
import { globalGetDatabase } from "@/utils/notion/get-database";

export const ReviewListSection = async (props: { currentPage: number }) => {
  const database = await globalGetDatabase(GLOBAL_DATABASE_NAME.REVIEWS, {
    filter: {
      property: "is_done",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "added_date",
        direction: "descending",
      },
    ],
  });

  if (database === undefined) {
    return <p>No items to show</p>;
  }

  const totalPageCount = calculateTotalPageCount(database.length, GLOBAL_REVIEWS_ITEMS_PER_PAGE);
  const startIndex = (props.currentPage - 1) * GLOBAL_REVIEWS_ITEMS_PER_PAGE;
  const endIndex = props.currentPage * GLOBAL_REVIEWS_ITEMS_PER_PAGE;
  const slicedData = database.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-6">
        {slicedData.map((item) => {
          return (
            <article key={`${item.id}`}>
              <Link
                className="block rounded-lg border border-edge bg-surface px-5 py-5 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out hover:border-edge-hover hover:bg-surface-hover hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px active:bg-bg-muted active:shadow-sm motion-reduce:transform-none motion-reduce:transition-none sm:px-6 sm:py-6"
                href={GLOBAL_INTERNAL_URL.MOVIES_SERIES_REVIEW(item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <h3 className="text-h3 leading-h3 font-semibold tracking-tight text-fg">{item.title}</h3>
                      {item.from.length > 0 && (
                        <div aria-label="감상 채널" className="flex items-center gap-2">
                          {item.from.map((ottName) => (
                            <GlobalOttBadge key={ottName} ottName={ottName} />
                          ))}
                        </div>
                      )}
                    </div>
                    {item.key_points.length > 0 && (
                      <ul aria-label="리뷰 키워드" className="mt-4 flex flex-wrap gap-2">
                        {item.key_points.map((keyPoint) => (
                          <li
                            key={keyPoint}
                            className="rounded-full border border-edge bg-bg-subtle px-2.5 py-1 text-caption text-muted"
                          >
                            {keyPoint}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <time className="shrink-0 text-caption text-subtle" dateTime={item.added_date}>
                    {item.added_date ? new Date(item.added_date).toLocaleDateString("ko") : ""}
                  </time>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <GlobalPagination basePath="/movies-series" currentPage={props.currentPage} totalPageCount={totalPageCount} />
    </div>
  );
};
