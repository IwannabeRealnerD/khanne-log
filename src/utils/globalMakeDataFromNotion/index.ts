import fs from "fs";
import path from "path";

import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";

import { internalQueryNotionDatabase } from "./internal/getNotionDatabase";

(async () => {
  const linesDatabase = await internalQueryNotionDatabase(GLOBAL_DATABASE_NAME.LINES, {
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

  const dirPath = path.join(process.cwd(), "public", "generated");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, "lines.json");

  fs.writeFileSync(filePath, JSON.stringify(linesDatabase, null, 2), "utf-8");

  // eslint-disable-next-line no-console
  console.log("✅ lines.json has been created in public/generated directory");
})();
