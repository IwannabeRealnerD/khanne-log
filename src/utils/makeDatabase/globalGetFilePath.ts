import { join } from "path";

/**
 * @description Get the file path for the database json file
 * @param databaseName - The name of the database to get the file path for
 * @returns The file path for the database
 */
export const globalGetFilePath = (databaseName: "LINES") => {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) {
    return join(process.cwd(), `${databaseName.toLowerCase()}.json`);
  }
  return join(process.cwd(), "public", `${databaseName.toLowerCase()}.json`);
};
