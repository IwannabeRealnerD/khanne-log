import { writeFile } from "fs/promises";

import { globalGetInfoFilePath } from "./getFilePath";
import { globalGetNotionDatabase } from "./globalGetNotionDatabase";

(async () => {
  const database = await globalGetNotionDatabase("LINE", {
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
  if (database) {
    const filePath = globalGetInfoFilePath("LINES");
    await writeFile(filePath, JSON.stringify(database, null, 2), "utf-8");
    return database;
  } else {
    throw new Error("Database is empty, please check the notion database you set up");
  }
})();
