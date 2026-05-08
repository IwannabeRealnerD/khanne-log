import { cacheLife } from "next/cache";

import { GlobalDatabaseName } from "@/types/database-name";
import { GlobalLine, GlobalReview } from "@/types/database-scheme";

import { getDataUntilDone } from "./get-data-until-done";
import { QueryDatabaseParameters } from "./query-body";

type GlobalDatabaseDataByName = {
  LINES: GlobalLine[];
  REVIEWS: GlobalReview[];
};

export async function globalGetDatabase<TDatabaseName extends GlobalDatabaseName>(
  databaseName: TDatabaseName,
  queryBody?: QueryDatabaseParameters
): Promise<GlobalDatabaseDataByName[TDatabaseName] | undefined> {
  "use cache";
  cacheLife("hours");

  if (!databaseName || !queryBody) {
    return undefined;
  }

  const fetchedAt = new Date().toISOString();
  const results = await getDataUntilDone(databaseName, queryBody);

  const response = {
    fetchedAt,
    data: results,
  };

  if (!response) {
    return undefined;
  }

  return response.data as GlobalDatabaseDataByName[TDatabaseName];
}
