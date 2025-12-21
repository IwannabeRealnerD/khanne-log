import { GlobalDatabaseName } from "@/types/DatabaseName";
import { GlobalLine } from "@/types/DatabaseScheme";

import { queryNotionDatabase } from "./getNotionDatabase";
import { QueryDatabaseParameters } from "./QueryBody";

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
