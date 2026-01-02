import { GlobalLineResponse } from "@/types/database-response";
import { GlobalDatabaseName } from "@/types/DatabaseName";
import { GlobalLine } from "@/types/DatabaseScheme";

import { getDataUntilDone } from "./getDataUntilDone";
import { QueryDatabaseParameters } from "./QueryBody";

async function queryNotionDatabase(
  databaseName: GlobalDatabaseName,
  queryBody: QueryDatabaseParameters
): Promise<GlobalLineResponse | undefined> {
  if (!databaseName) {
    throw new Error("Database name is required");
  }
  const fetchedAt = new Date().toISOString();

  const results = await getDataUntilDone(databaseName, queryBody);

  return {
    fetchedAt,
    data: results,
  };
}

export function globalGetDatabase(
  databaseName: "LINES",
  queryBody?: QueryDatabaseParameters
): Promise<GlobalLine[] | undefined>;
export function globalGetDatabase(databaseName: undefined, queryBody?: undefined): Promise<undefined>;

export async function globalGetDatabase(
  databaseName: "LINES" | undefined,
  queryBody?: QueryDatabaseParameters | undefined
): Promise<GlobalLine[] | undefined> {
  if (!databaseName || !queryBody) {
    return undefined;
  }

  const response = await queryNotionDatabase(databaseName as GlobalDatabaseName, queryBody);

  if (!response) {
    return undefined;
  }

  return response.data;
}
