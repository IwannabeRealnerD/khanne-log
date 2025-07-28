import { unstable_cache } from "next/cache";

import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";

import { internalQueryNotionDatabase } from "./internal/getNotionDatabase";

/**
 * @description unstable_cache is used in order to cache the database response and fetchedAt property.
 * @note this function will be replaced by "use cache" when it becomes stable.
 * @see https://blog.logrocket.com/caching-next-js-unstable-cache/
 */
export const globalGetLinesDatabase = unstable_cache(
  async () =>
    internalQueryNotionDatabase(GLOBAL_DATABASE_NAME.LINES, {
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
    }),
  [GLOBAL_DATABASE_NAME.LINES],
  {
    tags: [GLOBAL_DATABASE_NAME.LINES],
    revalidate: 60 * 60 * 24,
  }
);
