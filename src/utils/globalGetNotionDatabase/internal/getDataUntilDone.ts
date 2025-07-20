import { Client, isFullPage } from "@notionhq/client";
import { parse } from "valibot";

import { GlobalDatabaseName } from "@/types/DatabaseName";
import { GlobalLine, LineScheme } from "@/types/DatabaseScheme";

import {
  internalGetCheckbox,
  internalGetCreatedTime,
  internalGetMultiSelect,
  internalGetRichText,
  internalGetSelect,
  internalGetTitle,
} from "./propertyType";
import { InternalQueryDatabaseParameters } from "./QueryBody";

export const internalGetDataUntilDone = async (
  databaseName: GlobalDatabaseName,
  queryBody: InternalQueryDatabaseParameters,
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
    database_id: process.env.NOTION_LINES_DATABASE_ID!,
    ...queryBody,
    start_cursor: nextCursor,
  });

  if (response.results === undefined || response.results.length === 0) {
    throw new Error("No results found in the database");
  }

  if (response.results.length > 0 && isFullPage(response.results[0])) {
    response.results.forEach((result) => {
      if (!isFullPage(result)) {
        throw new Error("Notion database query returned non-full page");
      }
      if (databaseName === "LINES") {
        const transformedLineItem = {
          // FIXME - Should use valibot to parse the data
          id: result.id,
          title: internalGetTitle(result.properties.title),
          quote: internalGetRichText(result.properties.quote),
          from: internalGetSelect(result.properties.from),
          scene_description: internalGetRichText(result.properties.scene_description),
          key_points: internalGetMultiSelect(result.properties.key_points),
          comment: internalGetRichText(result.properties.comment),
          when: internalGetRichText(result.properties.when),
          added_date: internalGetCreatedTime(result.properties.added_date),
          is_spoiler: internalGetCheckbox(result.properties.is_spoiler),
        };
        try {
          parse(LineScheme, transformedLineItem);
        } catch {
          throw new Error(`Failed to parse line item: ${transformedLineItem.id}`);
        }
        copiedTempResults.push(transformedLineItem);
      }
    });
  }
  if (response.has_more && response.next_cursor) {
    return internalGetDataUntilDone(databaseName, queryBody, copiedTempResults, response.next_cursor);
  }
  return copiedTempResults;
};
