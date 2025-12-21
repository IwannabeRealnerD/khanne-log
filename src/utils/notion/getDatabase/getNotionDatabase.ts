"use server";

import { GlobalLineResponse } from "@/types/database-response";
import { GlobalDatabaseName } from "@/types/DatabaseName";

import { getDataUntilDone } from "./getDataUntilDone";
import { QueryDatabaseParameters } from "./QueryBody";

export async function queryNotionDatabase(
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
