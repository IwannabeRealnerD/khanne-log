"use server";

import { GlobalDatabaseName } from "@/types/DatabaseName";
import { InternalQueryDatabaseParameters } from "@/utils/globalGetNotionDatabase/internal/QueryBody";

/**
 * @deprecated - This function is deprecated and is remaining for reference.
 */
export async function internalDeprecatedQueryNotionDatabase(
  databaseName: GlobalDatabaseName,
  queryBody?: InternalQueryDatabaseParameters
) {
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
    body: queryBody ? JSON.stringify(queryBody) : undefined,
    // NOTE - Way to make post request cacheable
    // cache: "force-cache",
    // next: {
    //   tags: [databaseName],
    // },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Notion API error: ${response.status} ${response.statusText} - ${errorData.message || "Unknown error"}`
    );
  }

  const data = await response.json();
  return data;
}
