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
      <div className="flex flex-col gap-3">
        {pageData.map((item) => {
          return (
            <article key={`${item.id}`}>
              <p className="text-right text-xs text-gray-400">
                {item.added_date ? new Date(item.added_date).toLocaleDateString("ko") : ""}
              </p>
              <div className="rounded-xl border border-gray-300 p-3">
                <Title id={item.id} quote={item.quote} scene_description={item.scene_description} />
                <div className="mb-5 flex flex-col justify-between gap-2 border-b border-dashed border-gray-200 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-between">
                      <p className="text-base font-semibold">{item.title}</p>
                      <span className="text-sm font-normal">{item.when}</span>
                    </div>
                    <OttBadge ottName={item.from} />
                  </div>
                  <KeyPoints keyPoints={item.key_points} />
                </div>
                <Comment comment={item.comment} id={item.id} />
              </div>
            </article>
          );
        })}
      </div>
      <GlobalPagination currentPage={props.currentPage} totalPageCount={totalPageCount} />
    </div>
  );
};
