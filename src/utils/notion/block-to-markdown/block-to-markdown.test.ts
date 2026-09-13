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
  test("중첩된 글머리 목록이면 깊이에 맞게 들여쓴다", () => {
    const block = {
      bulleted_list_item: {
        color: "default",
        rich_text: [createRichText("중첩된 내용")],
      },
      type: "bulleted_list_item",
    } as BlockObjectResponse;

    expect(blockToMarkdown(block, 2)).toBe("    - 중첩된 내용");
  });

  test("북마크 설명과 주소를 마크다운 링크로 변환한다", () => {
    const block = {
      bookmark: {
        caption: [createRichText("참고 자료")],
        url: "https://example.com/reference_(1)",
      },
      type: "bookmark",
    } as BlockObjectResponse;

    expect(blockToMarkdown(block)).toBe("[참고 자료](<https://example.com/reference_(1)>)");
  });

  test("서식과 링크가 함께 있으면 서식을 보존한 링크로 변환한다", () => {
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

  test("지원하지 않는 블록이면 null을 반환한다", () => {
    const block = { type: "image" } as BlockObjectResponse;

    expect(blockToMarkdown(block)).toBeNull();
  });
});
