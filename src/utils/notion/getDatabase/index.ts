import { cacheLife } from "next/cache";

import { GlobalDatabaseName } from "@/types/DatabaseName";
import { GlobalLine } from "@/types/DatabaseScheme";

import { getDataUntilDone } from "./getDataUntilDone";
import { QueryDatabaseParameters } from "./QueryBody";

export async function globalGetDatabase(
  databaseName: GlobalDatabaseName,
  queryBody?: QueryDatabaseParameters
): Promise<GlobalLine[] | undefined> {
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

  return response.data;
}
