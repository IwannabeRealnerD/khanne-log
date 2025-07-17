import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

import { globalGetInfoFilePath } from "@/utils/makeDatabase/getFilePath";
import { globalGetNotionDatabase } from "@/utils/makeDatabase/globalGetNotionDatabase";

export async function GET() {
  try {
    // FIXME - Needs to be refactored with shared common function
    const database = await globalGetNotionDatabase("LINE", {
      filter: {
        property: "is_done",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "added_date",
          direction: "ascending",
        },
      ],
    });
    if (database) {
      const filePath = globalGetInfoFilePath("LINES");
      await writeFile(filePath, JSON.stringify(database, null, 2), "utf-8");

      revalidateTag("lines");
      return NextResponse.json({ message: "Database updated" });
    } else {
      return NextResponse.json(
        { error: "Database is empty, please check the notion database you set up" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
