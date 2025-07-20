import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";

export type GlobalDatabaseName = (typeof GLOBAL_DATABASE_NAME)[keyof typeof GLOBAL_DATABASE_NAME];
