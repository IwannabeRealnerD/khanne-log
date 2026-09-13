import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type MarkdownRichText = Pick<RichTextItemResponse, "annotations" | "href" | "plain_text">;

const formatRichText = (richTexts: MarkdownRichText[]): string =>
  richTexts
    .map((richText) => {
      let text = richText.plain_text;

      if (richText.annotations.code) {
        text = `\`${text}\``;
      }
      if (richText.annotations.bold) {
        text = `**${text}**`;
      }
      if (richText.annotations.italic) {
        text = `*${text}*`;
      }
      if (richText.annotations.strikethrough) {
        text = `~~${text}~~`;
      }
      if (richText.href) {
        text = `[${text}](<${richText.href}>)`;
      }

      return text;
    })
    .join("");

const indentMarkdown = (markdown: string, depth: number): string => {
  if (depth === 0) {
    return markdown;
  }

  const indentation = "  ".repeat(depth);
  return markdown
    .split("\n")
    .map((line) => `${indentation}${line}`)
    .join("\n");
};

export const blockToMarkdown = (block: BlockObjectResponse, depth = 0): string | null => {
  let markdown: string;

  switch (block.type) {
    case "paragraph":
      markdown = formatRichText(block.paragraph.rich_text);
      break;
    case "heading_1":
      markdown = `# ${formatRichText(block.heading_1.rich_text)}`;
      break;
    case "heading_2":
      markdown = `## ${formatRichText(block.heading_2.rich_text)}`;
      break;
    case "heading_3":
      markdown = `### ${formatRichText(block.heading_3.rich_text)}`;
      break;
    case "bulleted_list_item":
      markdown = `- ${formatRichText(block.bulleted_list_item.rich_text)}`;
      break;
    case "numbered_list_item":
      markdown = `1. ${formatRichText(block.numbered_list_item.rich_text)}`;
      break;
    case "to_do":
      markdown = `- [${block.to_do.checked ? "x" : " "}] ${formatRichText(block.to_do.rich_text)}`;
      break;
    case "quote":
      markdown = `> ${formatRichText(block.quote.rich_text)}`;
      break;
    case "code":
      markdown = `\`\`\`${block.code.language}\n${formatRichText(block.code.rich_text)}\n\`\`\``;
      break;
    case "divider":
      markdown = "---";
      break;
    case "callout":
      markdown = `> ${formatRichText(block.callout.rich_text)}`;
      break;
    case "bookmark": {
      const caption = formatRichText(block.bookmark.caption);
      markdown = `[${caption || block.bookmark.url}](<${block.bookmark.url}>)`;
      break;
    }
    default:
      return null;
  }

  return indentMarkdown(markdown, depth);
};
