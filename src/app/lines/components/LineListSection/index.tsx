import { GlobalPagination } from "@/components/pagination";
import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";
import { GLOBAL_ITEMS_PER_PAGE } from "@/constants/pagination";
import { globalGetDatabase } from "@/utils/notion/getDatabase";

import { Comment } from "./Comment";
import { KeyPoints } from "./KeyPoints";
import { OttBadge } from "./OttBadge";
import { Title } from "./Title";

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
  const pageData = database.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-6">
        {pageData.map((item) => {
          return (
            <article
              key={`${item.id}`}
              className="rounded-lg border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Header: 작품 메타 정보 */}
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

              {/* Body: 인용문 (메인 콘텐츠) */}
              <div className="border-t border-border bg-bg-subtle px-4 py-4">
                <Title id={item.id} quote={item.quote} scene_description={item.scene_description} />
              </div>

              {/* Footer: 코멘트 */}
              {item.comment && (
                <div className="border-t border-border px-4 py-3">
                  <Comment comment={item.comment} id={item.id} />
                </div>
              )}
            </article>
          );
        })}
      </div>
      <GlobalPagination currentPage={props.currentPage} totalPageCount={totalPageCount} />
    </div>
  );
};
