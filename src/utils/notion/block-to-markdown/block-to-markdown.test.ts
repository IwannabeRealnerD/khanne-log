import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { describe, expect, test } from "vitest";

import { blockToMarkdown } from ".";

const createRichText = (
  plainText: string,
  options?: { annotations?: Partial<RichTextItemResponse["annotations"]>; href?: string }
): RichTextItemResponse =>
  ({
    annotations: {
      bold: false,
      code: false,
      color: "default",
      italic: false,
      strikethrough: false,
      underline: false,
      ...options?.annotations,
    },
    href: options?.href ?? null,
    plain_text: plainText,
    text: { content: plainText, link: options?.href ? { url: options.href } : null },
    type: "text",
  }) as RichTextItemResponse;

describe("src/utils/notion/block-to-markdown -> blockToMarkdown", () => {
  test("indents a nested bulleted list according to its depth", () => {
    const block = {
      bulleted_list_item: {
        color: "default",
        rich_text: [createRichText("중첩된 내용")],
      },
      type: "bulleted_list_item",
    } as BlockObjectResponse;

    expect(blockToMarkdown(block, 2)).toBe("    - 중첩된 내용");
  });

  test("converts a bookmark caption and URL into a Markdown link", () => {
    const block = {
      bookmark: {
        caption: [createRichText("참고 자료")],
        url: "https://example.com/reference_(1)",
      },
      type: "bookmark",
    } as BlockObjectResponse;

    expect(blockToMarkdown(block)).toBe("[참고 자료](<https://example.com/reference_(1)>)");
  });

  test("preserves formatting when converting linked rich text", () => {
    const block = {
      paragraph: {
        color: "default",
        rich_text: [
          createRichText("강조", {
            annotations: { bold: true, italic: true },
            href: "https://example.com",
          }),
        ],
      },
      type: "paragraph",
    } as BlockObjectResponse;

    expect(blockToMarkdown(block)).toBe("[***강조***](<https://example.com>)");
  });

  test("returns null for an unsupported block type", () => {
    const block = { type: "image" } as BlockObjectResponse;

    expect(blockToMarkdown(block)).toBeNull();
  });
});
