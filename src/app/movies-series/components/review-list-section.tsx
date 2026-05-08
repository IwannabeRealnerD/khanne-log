import { GlobalKeyPoints } from "@/components/key-points";
import { GlobalOttBadge } from "@/components/ott-badge";
import { GlobalPagination } from "@/components/pagination";
import { GLOBAL_DATABASE_NAME } from "@/constants/database-name";
import { GLOBAL_REVIEWS_ITEMS_PER_PAGE } from "@/constants/pagination";
import { globalGetDatabase } from "@/utils/notion/get-database";

export const ReviewListSection = async (props: { currentPage: number }) => {
  const database = await globalGetDatabase(GLOBAL_DATABASE_NAME.REVIEWS, {
    filter: {
      property: "isDone",
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

  const totalPageCount = Math.ceil(database.length / GLOBAL_REVIEWS_ITEMS_PER_PAGE);
  const startIndex = (props.currentPage - 1) * GLOBAL_REVIEWS_ITEMS_PER_PAGE;
  const endIndex = props.currentPage * GLOBAL_REVIEWS_ITEMS_PER_PAGE;
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
                    <div className="flex items-center gap-1.5">
                      {item.from.map((ottName) => (
                        <GlobalOttBadge key={ottName} ottName={ottName} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-caption text-muted">
                    <GlobalKeyPoints keyPoints={item.key_points} />
                  </div>
                </div>
                <span className="shrink-0 text-caption text-subtle">
                  {item.added_date ? new Date(item.added_date).toLocaleDateString("ko") : ""}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <GlobalPagination basePath="/movies-series" currentPage={props.currentPage} totalPageCount={totalPageCount} />
    </div>
  );
};
