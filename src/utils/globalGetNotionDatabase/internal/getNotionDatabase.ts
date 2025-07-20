"use server";

import { GlobalDatabaseName } from "@/types/DatabaseName";
import { GlobalLine } from "@/types/DatabaseScheme";

import { internalGetDataUntilDone } from "./getDataUntilDone";
import { InternalQueryDatabaseParameters } from "./QueryBody";

interface GlobalNotionDatabaseResponse {
  fetchedAt: string;
  data: GlobalLine[];
}

export async function internalQueryNotionDatabase(
  databaseName: GlobalDatabaseName,
  queryBody: InternalQueryDatabaseParameters
): Promise<GlobalNotionDatabaseResponse>;

export async function internalQueryNotionDatabase(
  databaseName: GlobalDatabaseName,
  queryBody: InternalQueryDatabaseParameters
): Promise<GlobalNotionDatabaseResponse | undefined> {
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
