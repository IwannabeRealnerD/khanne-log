import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";
import { internalQueryNotionDatabase } from "@/utils/globalGetNotionDatabase/internal/getNotionDatabase";

(() => {
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
        direction: "ascending",
      },
    ],
  });
})();
