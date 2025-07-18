import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    revalidateTag("lines");
    return NextResponse.json({ message: "Database has been revalidated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
