"use server";

import { Client, isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { pick, safeParse } from "valibot";

import { GlobalDatabaseName } from "@/types/database-name";
import { GlobalLine, GlobalLineScheme, GlobalReview, GlobalReviewScheme } from "@/types/database-scheme";
import { GlobalOttServiceNameSchema } from "@/types/ott-service-name";

import { getCheckbox, getCreatedTime, getMultiSelect, getRichText, getSelectAsEnum, getTitle } from "../property-type";
import { QueryDatabaseParameters } from "../query-body";

type GlobalDatabaseItem = GlobalLine | GlobalReview;

const DATABASE_ID_ENV_KEY_BY_DATABASE_NAME = {
  LINES: "NOTION_LINES_DATABASE_ID",
  REVIEWS: "NOTION_REVIEWS_DATABASE_ID",
} as const satisfies Record<GlobalDatabaseName, string>;

export const getDataUntilDone = async (
  databaseName: GlobalDatabaseName,
  queryBody: QueryDatabaseParameters,
  prevResults?: GlobalDatabaseItem[],
  nextCursor?: string
): Promise<GlobalDatabaseItem[]> => {
  const databaseIdEnvKey = DATABASE_ID_ENV_KEY_BY_DATABASE_NAME[databaseName];
  const databaseId = process.env[databaseIdEnvKey];

  if (!databaseId) {
    throw new Error(`${databaseIdEnvKey} is not set`);
  }
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set");
  }
  const copiedTempResults = [...(prevResults ?? [])];

  const notionClient = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const response = await notionClient.databases.query({
    database_id: databaseId,
    ...queryBody,
    start_cursor: nextCursor,
  });

  if (response.results === undefined || response.results.length === 0) {
    throw new Error("No results found in the database");
  }

  if (response.results.length > 0 && isFullPage(response.results[0])) {
    for (const _result of response.results) {
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

      if (databaseName === "REVIEWS") {
        const refinedReviewItem = {
          id: result.id,
          title: getTitle(result.properties.title, pick(GlobalReviewScheme, ["title"]).entries.title),
          from: getMultiSelect(result.properties.from),
          key_points: getMultiSelect(result.properties.key_points),
          added_date: getCreatedTime(
            result.properties.added_date,
            pick(GlobalReviewScheme, ["added_date"]).entries.added_date
          ),
          is_done: getCheckbox(result.properties.isDone, pick(GlobalReviewScheme, ["is_done"]).entries.is_done),
        };
        const parsedData = safeParse(GlobalReviewScheme, refinedReviewItem);
        if (!parsedData.success) {
          throw new Error(`Failed to parse review item: ${parsedData.issues}`);
        }
        copiedTempResults.push(parsedData.output);
      }
    }
  }
  if (response.has_more && response.next_cursor) {
    return getDataUntilDone(databaseName, queryBody, copiedTempResults, response.next_cursor);
  }
  return copiedTempResults;
};
