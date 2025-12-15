"use server";

import { isFullPage } from "@notionhq/client";

import { GlobalQueryBody } from "@/types/QueryBody";
import {
  globalGetCheckbox,
  globalGetCreatedTime,
  globalGetMultiSelect,
  globalGetRichText,
  globalGetSelect,
  globalGetTitle,
} from "@/utils/notion/propertyType";

<<<<<<< HEAD
import { queryNotionDatabase } from "./queryNotionDatabase";
=======
import { internalQueryNotionDatabase } from "./internal/queryNotionDatabase";
>>>>>>> 3df3b94 (change env)

type LineData = {
  id: string;
  title: string | null;
  quote: string | null;
  from: string | null;
  scene_description: string | null;
  key_points: string[];
  comment: string | null;
  when: string | null;
  added_date: string | null;
  is_spoiler: boolean;
};

export function globalGetDatabase(databaseName: "LINES", queryBody?: GlobalQueryBody): Promise<LineData[] | undefined>;
export function globalGetDatabase(databaseName: undefined, queryBody?: undefined): Promise<undefined>;

export async function globalGetDatabase(
  databaseName: "LINES" | undefined,
  queryBody?: GlobalQueryBody | undefined
): Promise<LineData[] | undefined> {
  if (!databaseName) {
    throw new Error("Database name is required");
  }
<<<<<<< HEAD
  const response = await queryNotionDatabase(databaseName, queryBody);
=======
  const response = await internalQueryNotionDatabase(databaseName, queryBody);
>>>>>>> 3df3b94 (change env)
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
          return {
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
        }
      })
      .filter((item): item is LineData => Boolean(item));
    return refinedResponse;
  }
}
