"use server";

import { Client, isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { pick, safeParse } from "valibot";

import { GlobalDatabaseName } from "@/types/database-name";
import { GlobalLine, GlobalLineScheme } from "@/types/database-scheme";
import { GlobalOttServiceNameSchema } from "@/types/ott-service-name";

import { getCheckbox, getCreatedTime, getMultiSelect, getRichText, getSelectAsEnum, getTitle } from "./property-type";
import { QueryDatabaseParameters } from "./query-body";

export const getDataUntilDone = async (
  databaseName: GlobalDatabaseName,
  queryBody: QueryDatabaseParameters,
  prevResults?: GlobalLine[],
  nextCursor?: string
): Promise<GlobalLine[]> => {
  if (!process.env.NOTION_LINES_DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID_LINES is not set");
  }
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set");
  }
  const copiedTempResults = [...(prevResults ?? [])];

  const notionClient = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_LINES_DATABASE_ID,
    ...queryBody,
    start_cursor: nextCursor,
  });

  if (response.results === undefined || response.results.length === 0) {
    throw new Error("No results found in the database");
  }

  if (response.results.length > 0 && isFullPage(response.results[0])) {
    response.results.forEach((_result) => {
      const result = _result as Extract<QueryDatabaseResponse["results"][number], { properties: unknown }>;
      if (!isFullPage(result)) {
        throw new Error("Notion database query returned non-full page");
      }

      if (databaseName === "LINES") {
        const refinedLineItem = {
          id: result.id,
          title: getTitle(result.properties.title, pick(GlobalLineScheme, ["title"]).entries.title),
          quote: getRichText(result.properties.quote, pick(GlobalLineScheme, ["quote"]).entries.quote),
          from: getSelectAsEnum(result.properties.from, GlobalOttServiceNameSchema),
          scene_description: getRichText(
            result.properties.scene_description,
            pick(GlobalLineScheme, ["scene_description"]).entries.scene_description
          ),
          key_points: getMultiSelect(result.properties.key_points),
          comment: getRichText(result.properties.comment, pick(GlobalLineScheme, ["comment"]).entries.comment),
          when: getRichText(result.properties.when, pick(GlobalLineScheme, ["when"]).entries.when),
          added_date: getCreatedTime(
            result.properties.added_date,
            pick(GlobalLineScheme, ["added_date"]).entries.added_date
          ),
          is_spoiler: getCheckbox(
            result.properties.is_spoiler,
            pick(GlobalLineScheme, ["is_spoiler"]).entries.is_spoiler
          ),
        };
        const parsedData = safeParse(GlobalLineScheme, refinedLineItem);
        if (!parsedData.success) {
          throw new Error(`Failed to parse line item: ${parsedData.issues}`);
        }
        copiedTempResults.push(parsedData.output);
      }
    });
  }
  if (response.has_more && response.next_cursor) {
    return getDataUntilDone(databaseName, queryBody, copiedTempResults, response.next_cursor);
  }
  return copiedTempResults;
};
