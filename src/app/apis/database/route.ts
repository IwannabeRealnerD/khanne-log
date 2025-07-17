import { NextResponse } from "next/server";
import fs from "fs";

import { globalGetFilePath } from "@/utils/makeDatabase/globalGetFilePath";

export async function GET() {
  const filePath = globalGetFilePath("LINES");
  const database = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(database));
}
