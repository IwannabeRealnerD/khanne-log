import { unstable_cache } from "next/cache";

import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";
import { GlobalDatabaseName } from "@/types/DatabaseName";

import { internalQueryNotionDatabase } from "./internal/getNotionDatabase";
/**
 * @description unstable_cache is used in order to cache the database response and fetchedAt property.
 * @note this function will be replaced by "use cache" when it becomes stable.
 * @see https://blog.logrocket.com/caching-next-js-unstable-cache/
 */

// TODO : Should change the function to accept databaseName as an argument.
export const globalGetNotionDatabase = unstable_cache(
  async (databaseName: GlobalDatabaseName) =>
    internalQueryNotionDatabase(databaseName, {
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
