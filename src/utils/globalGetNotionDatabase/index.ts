"use server";

import { isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { InferInput, parse } from "valibot";

import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";
import { GlobalLine, LineScheme } from "@/types/DatabaseScheme";
import { GlobalQueryBody } from "@/types/QueryBody";

import {
  internalGetCheckbox,
  internalGetCreatedTime,
  internalGetMultiSelect,
  internalGetRichText,
  internalGetSelect,
  internalGetTitle,
} from "./internal/propertyType";
import { internalQueryNotionDatabase } from "./internal/queryNotionDatabase";

export function globalGetNotionDatabase(
  databaseName: (typeof GLOBAL_DATABASE_NAME)[keyof typeof GLOBAL_DATABASE_NAME],
  queryBody?: GlobalQueryBody
): Promise<GlobalLine[] | undefined>;
export function globalGetNotionDatabase(databaseName: undefined, queryBody?: undefined): Promise<undefined>;

export async function globalGetNotionDatabase(
  databaseName: (typeof GLOBAL_DATABASE_NAME)[keyof typeof GLOBAL_DATABASE_NAME] | undefined,
  queryBody?: GlobalQueryBody | undefined
): Promise<GlobalLine[] | undefined> {
  if (!databaseName) {
    throw new Error("Database name is required");
  }
  const response = (await internalQueryNotionDatabase(databaseName, queryBody)) as QueryDatabaseResponse;
  if (response.results === undefined || response.results.length === 0) {
    return undefined;
  }
  if (response.results.length > 0 && isFullPage(response.results[0])) {
    const refinedResponse = response.results
      .map((result) => {
        if (!isFullPage(result) || databaseName !== "LINES") {
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
          return transformedLineItem;
        }
      })
      .filter((item): item is InferInput<typeof LineScheme> => Boolean(item));
    return refinedResponse;
  }
}
