"use server";

import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import { GlobalQueryBody } from "@/types/QueryBody";

export async function internalQueryNotionDatabase(databaseName: "LINE", queryBody?: GlobalQueryBody) {
  const databaseId = process.env[`NOTION_DATABASE_ID_${databaseName}`];
  const integrationToken = process.env.NOTION_API_KEY;

  if (!databaseId || !integrationToken) {
    throw new Error("Notion database ID or integration token is not set");
  }

  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${integrationToken}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    next: {
      // FIXME - Should find reasonable cache time
      revalidate: 30,
    },
    body: queryBody ? JSON.stringify(queryBody) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Notion API error: ${response.status} ${response.statusText} - ${errorData.message || "Unknown error"}`
    );
  }

  const data = await response.json();
  return data as QueryDatabaseResponse;
}
