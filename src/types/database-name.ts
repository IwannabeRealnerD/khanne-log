import { GLOBAL_DATABASE_NAME } from "@/constants/database-name";

export type GlobalDatabaseName = (typeof GLOBAL_DATABASE_NAME)[keyof typeof GLOBAL_DATABASE_NAME];
