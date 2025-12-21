import { QueryDatabaseParameters as NotionQueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export type QueryDatabaseParameters = Omit<NotionQueryDatabaseParameters, "database_id">;
