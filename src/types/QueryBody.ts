import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export type GlobalQueryBody = {
  filter?: QueryDatabaseParameters["filter"];
  sorts?: QueryDatabaseParameters["sorts"];
};
