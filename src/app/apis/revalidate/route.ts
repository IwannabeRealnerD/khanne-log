import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { GLOBAL_DATABASE_NAME } from "@/constants/databaseName";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized cron request", {
      status: 401,
    });
  }
  try {
    revalidateTag(GLOBAL_DATABASE_NAME.LINES);
    return NextResponse.json({ message: "Database has been revalidated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
