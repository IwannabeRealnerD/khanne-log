"use server";

import { isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { InferInput, parse } from "valibot";

import { GlobalLine, LineScheme } from "@/types/DatabaseScheme";
import { GlobalQueryBody } from "@/types/QueryBody";
import {
  globalGetCheckbox,
  globalGetCreatedTime,
  globalGetMultiSelect,
  globalGetRichText,
  globalGetSelect,
  globalGetTitle,
} from "@/utils/notion/propertyType";

import { globalQueryNotionDatabase } from "./globalQueryNotionDatabase";

export function globalGetNotionDatabase(
  databaseName: "LINE",
  queryBody?: GlobalQueryBody
): Promise<GlobalLine[] | undefined>;
export function globalGetNotionDatabase(databaseName: undefined, queryBody?: undefined): Promise<undefined>;

export async function globalGetNotionDatabase(
  databaseName: "LINE" | undefined,
  queryBody?: GlobalQueryBody | undefined
): Promise<GlobalLine[] | undefined> {
  if (!databaseName) {
    throw new Error("Database name is required");
  }
  const response = (await globalQueryNotionDatabase(databaseName, queryBody)) as QueryDatabaseResponse;
  if (response.results === undefined || response.results.length === 0) {
    return undefined;
  }
  if (response.results.length > 0 && isFullPage(response.results[0])) {
    const refinedResponse = response.results
      .map((result) => {
        if (!isFullPage(result) || databaseName !== "LINE") {
          throw new Error("Notion database query returned non-full page");
        }
        if (databaseName === "LINE") {
          const transformedLineItem = {
            // FIXME - Should use valibot to parse the data
            id: result.id,
            title: globalGetTitle(result.properties.title),
            quote: globalGetRichText(result.properties.quote),
            from: globalGetSelect(result.properties.from),
            scene_description: globalGetRichText(result.properties.scene_description),
            key_points: globalGetMultiSelect(result.properties.key_points),
            comment: globalGetRichText(result.properties.comment),
            when: globalGetRichText(result.properties.when),
            added_date: globalGetCreatedTime(result.properties.added_date),
            is_spoiler: globalGetCheckbox(result.properties.is_spoiler),
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
