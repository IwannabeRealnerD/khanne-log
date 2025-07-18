import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";
import { globalGetNotionDatabase } from "@/utils/globalGetNotionDatabase";

import { InternalMainTitle } from "./main-title";

export const InternalLineListSection = async () => {
  const database = await globalGetNotionDatabase(GLOBAL_DATABASE_NAME.LINES, {
    filter: {
      property: "is_done",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "added_date",
        direction: "ascending",
      },
    ],
  });

  if (database === undefined) {
    return <p>No items to show</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {database.map((item) => {
        const refinedTitles = (() => {
          if (!item.quote && item.scene_description) {
            return {
              main: <InternalMainTitle isDescription id={item.id} title={item.scene_description} />,
              sub: null,
            };
          }
          return {
            main: <InternalMainTitle id={item.id} title={item.quote ?? ""} />,
            sub: item.scene_description,
          };
        })();
        const refinedComment = (() => {
          if (!item.comment) {
            return null;
          }
          const splittedComment = item.comment.split("\n");
          if (splittedComment.length === 1) {
            return <p className="pl-5 -indent-3">{splittedComment[0]}</p>;
          }
          return (
            <ul>
              {splittedComment.map((line, index) => (
                <li key={`${item.id}-${index}`} className="pl-5 -indent-3">
                  {line}
                </li>
              ))}
            </ul>
          );
        })();

        return (
          <article key={`${item.id}`} className="rounded-md border border-gray-200 p-4">
            {refinedTitles.main}
            <div className="mb-5 flex justify-between gap-10">
              <div className="w-1/2">
                <p className="text-base">{item.title}</p>
                <p className="text-base">{item.when}</p>
                {refinedTitles.sub && <p>{refinedTitles.sub}</p>}
              </div>
              <div className="w-1/2 text-right">
                {item.added_date && (
                  <p className="text-base">Added on : {new Date(item.added_date).toLocaleDateString("ko")}</p>
                )}
                <p className="text-base">{item.from}</p>
                <p className="text-base">{item.key_points.join(", ")}</p>
              </div>
            </div>
            {refinedComment}
          </article>
        );
      })}
    </div>
  );
};
