import { writeFile } from "fs/promises";

import { globalGetFilePath } from "./globalGetFilePath";
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
    const filePath = globalGetFilePath("LINES");
    await writeFile(filePath, JSON.stringify(database, null, 2), "utf-8");
    return database;
  } else {
    throw new Error("Database is empty, please check the notion database you set up");
  }
})();
