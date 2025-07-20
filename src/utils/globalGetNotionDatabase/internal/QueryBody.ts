import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export interface InternalQueryDatabaseParameters extends Omit<QueryDatabaseParameters, "database_id"> {}
