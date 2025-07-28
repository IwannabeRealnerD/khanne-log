"use server";

import { GlobalLineResponse } from "@/types/database-response";
import { GlobalDatabaseName } from "@/types/DatabaseName";

import { internalGetDataUntilDone } from "./getDataUntilDone";
import { InternalQueryDatabaseParameters } from "./QueryBody";

export async function internalQueryNotionDatabase(
  databaseName: GlobalDatabaseName,
  queryBody: InternalQueryDatabaseParameters
): Promise<GlobalLineResponse>;

export async function internalQueryNotionDatabase(
  databaseName: GlobalDatabaseName,
  queryBody: InternalQueryDatabaseParameters
): Promise<GlobalLineResponse | undefined> {
  if (!databaseName) {
    throw new Error("Database name is required");
  }
  const fetchedAt = new Date().toISOString();

  const results = await internalGetDataUntilDone(databaseName, queryBody);

  return {
    fetchedAt,
    data: results,
  };
}
