import { NextResponse } from "next/server";
import fs from "fs";

import { globalGetInfoFilePath } from "@/utils/makeDatabase/getFilePath";

export async function GET() {
  const filePath = globalGetInfoFilePath("LINES");
  const database = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(database));
}
