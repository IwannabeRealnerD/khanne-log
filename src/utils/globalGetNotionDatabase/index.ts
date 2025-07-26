import { unstable_cache } from "next/cache";

import { GlobalDatabaseName } from "@/types/DatabaseName";

import { internalQueryNotionDatabase } from "./internal/getNotionDatabase";

export const globalGetNotionDatabase = (databaseName: GlobalDatabaseName) => {
  const cachedFunction = unstable_cache(
    async () =>
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
    [databaseName],
    {
      tags: [databaseName],
    }
  );
  return cachedFunction();
};
