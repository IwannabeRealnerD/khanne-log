import { cacheLife } from "next/cache";

import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const getNotionClient = () => {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set");
  }
  return new Client({ auth: process.env.NOTION_API_KEY });
};

type RichText = { plain_text: string; annotations: BlockAnnotations; href: string | null };
type BlockAnnotations = { bold: boolean; italic: boolean; strikethrough: boolean; code: boolean };

const formatRichText = (richTexts: RichText[]): string =>
  richTexts
    .map((t) => {
      let text = t.plain_text;
      if (t.annotations.code) {
        text = `\`${text}\``;
      }
      if (t.annotations.bold) {
        text = `**${text}**`;
      }
      if (t.annotations.italic) {
        text = `*${text}*`;
      }
      if (t.annotations.strikethrough) {
        text = `~~${text}~~`;
      }
      if (t.href) {
        text = `[${text}](${t.href})`;
      }
      return text;
    })
    .join("");

const blockToMarkdown = (block: BlockObjectResponse): string | null => {
  switch (block.type) {
    case "paragraph":
      return formatRichText(block.paragraph.rich_text as RichText[]);
    case "heading_1":
      return `# ${formatRichText(block.heading_1.rich_text as RichText[])}`;
    case "heading_2":
      return `## ${formatRichText(block.heading_2.rich_text as RichText[])}`;
    case "heading_3":
      return `### ${formatRichText(block.heading_3.rich_text as RichText[])}`;
    case "bulleted_list_item":
      return `- ${formatRichText(block.bulleted_list_item.rich_text as RichText[])}`;
    case "numbered_list_item":
      return `1. ${formatRichText(block.numbered_list_item.rich_text as RichText[])}`;
    case "to_do":
      return `- [${block.to_do.checked ? "x" : " "}] ${formatRichText(block.to_do.rich_text as RichText[])}`;
    case "quote":
      return `> ${formatRichText(block.quote.rich_text as RichText[])}`;
    case "code":
      return `\`\`\`${block.code.language}\n${formatRichText(block.code.rich_text as RichText[])}\n\`\`\``;
    case "divider":
      return "---";
    case "callout":
      return `> ${formatRichText(block.callout.rich_text as RichText[])}`;
    default:
      return null;
  }
};

export const getPageMarkdown = async (pageId: string): Promise<string> => {
  "use cache";
  cacheLife("hours");

  const client = getNotionClient();
  const lines: string[] = [];
  let cursor: string | undefined;

  do {
    const response = await client.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      if (!("type" in block)) {
        continue;
      }
      const md = blockToMarkdown(block as BlockObjectResponse);
      if (md !== null) {
        lines.push(md);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return lines.join("\n");
};
