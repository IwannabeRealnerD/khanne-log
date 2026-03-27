import { Suspense } from "react";

import { GlobalPagination } from "@/components/pagination";
import { GLOBAL_DATABASE_NAME } from "@/constants/database-name";
import { GLOBAL_ITEMS_PER_PAGE } from "@/constants/pagination";
import { globalGetDatabase } from "@/utils/notion/get-database";

import { Comment } from "./comment";
import { KeyPoints } from "./key-points";
import { OttBadge } from "./ott-badge";
import { Title } from "./title";

export const LineListSection = async (props: { currentPage: number }) => {
  const itemsPerPage = GLOBAL_ITEMS_PER_PAGE;

  const database = await globalGetDatabase(GLOBAL_DATABASE_NAME.LINES, {
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

  const totalPageCount = Math.ceil(database.length / itemsPerPage);
  const startIndex = (props.currentPage - 1) * itemsPerPage;
  const endIndex = props.currentPage * itemsPerPage;
  const slicedData = database.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-6">
        {slicedData.map((item) => {
          return (
            <article
              key={`${item.id}`}
              className="rounded-lg border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-body font-semibold text-fg">{item.title}</h3>
                    <OttBadge ottName={item.from} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-caption text-muted">
                    {item.when && <span>{item.when}</span>}
                    {item.when && item.key_points.length > 0 && <span>·</span>}
                    <KeyPoints keyPoints={item.key_points} />
                  </div>
                </div>
                <span className="shrink-0 text-caption text-subtle">
                  {item.added_date ? new Date(item.added_date).toLocaleDateString("ko") : ""}
                </span>
              </div>
              <Title id={item.id} quote={item.quote} scene_description={item.scene_description} />
              <Suspense
                key={item.id}
                fallback={
                  <div className="border-t border-border px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      {Array.from({ length: Math.floor(Math.random() * 13) + 3 }).map((_, i) => (
                        <div key={i + 1} className="h-3.5 w-full animate-pulse rounded bg-bg-subtle" />
                      ))}
                    </div>
                  </div>
                }
              >
                <Comment pageId={item.id} />
              </Suspense>
            </article>
          );
        })}
      </div>
      <GlobalPagination currentPage={props.currentPage} totalPageCount={totalPageCount} />
    </div>
  );
};
