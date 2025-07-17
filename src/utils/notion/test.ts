// NOTE - Test file for notion client

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const databaseId = process.env.NOTION_DATABASE_ID_LINE;

notion.databases.query({
  database_id: databaseId ?? "",
});
