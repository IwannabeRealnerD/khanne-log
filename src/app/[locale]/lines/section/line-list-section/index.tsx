import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";
import { globalGetNotionDatabase } from "@/utils/globalGetNotionDatabase";

import { InternalMainTitle } from "../../internal/main-title";
import { InternalOttBadge } from "../../internal/OttBadge";

/**
 * @description unstable_cache is used in order to cache the database response and fetchedAt property.
 * @note this function will be replaced by "use cache" when it becomes stable.
 * @see https://blog.logrocket.com/caching-next-js-unstable-cache/
 */

export const InternalLineListSection = async () => {
  const databaseResponse = await globalGetNotionDatabase(GLOBAL_DATABASE_NAME.LINES);
  if (databaseResponse === undefined) {
    return <p>No items to show</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-3 flex flex-col gap-2 text-xs text-gray-500">
        <p>updated at (UTC) - {new Date(databaseResponse.fetchedAt).toUTCString()}</p>
        <p>
          updated at (KST) - {new Date(databaseResponse.fetchedAt).toLocaleString("ko", { timeZone: "Asia/Seoul" })}
        </p>
        <p>total items: {databaseResponse.data.length}</p>
      </div>
      <div className="flex flex-col gap-5">
        {databaseResponse.data.map((item) => {
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
            <article key={`${item.id}`}>
              {item.added_date && (
                <p className="text-right text-xs text-gray-400">{new Date(item.added_date).toLocaleDateString("ko")}</p>
              )}
              <div className="rounded-xl border border-gray-200 p-4">
                {refinedTitles.main}
                <div className="mb-5 flex flex-col justify-between gap-2">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold">
                      {item.title}
                      <span className="text-sm font-normal"> - {item.when}</span>
                    </p>
                  </div>
                  {/* <p className="text-base">{item.from}</p> */}
                  <InternalOttBadge ottName={item.from} />
                  <div>
                    <p className="text-base">{item.key_points.join(", ")}</p>
                  </div>
                  {refinedTitles.sub && <p>{refinedTitles.sub}</p>}
                </div>
                {refinedComment}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
