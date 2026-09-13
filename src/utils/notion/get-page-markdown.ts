import { cacheLife } from "next/cache";

import { Client, isFullBlock } from "@notionhq/client";

import { blockToMarkdown } from "./block-to-markdown";

const getNotionClient = () => {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set");
  }
  return new Client({ auth: process.env.NOTION_API_KEY });
};

const getBlockMarkdown = async (client: Client, blockId: string, depth = 0): Promise<string[]> => {
  const lines: string[] = [];
  let cursor: string | undefined;

  do {
    const response = await client.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });
    const renderedBlocks = await Promise.all(
      response.results.map(async (block) => {
        if (!isFullBlock(block)) {
          return [];
        }

        const renderedBlock: string[] = [];
        const markdown = blockToMarkdown(block, depth);
        if (markdown !== null) {
          renderedBlock.push(markdown);
        }
        if (block.has_children) {
          renderedBlock.push(...(await getBlockMarkdown(client, block.id, depth + 1)));
        }

        return renderedBlock;
      })
    );

    lines.push(...renderedBlocks.flat());
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return lines;
};

export const getPageMarkdown = async (pageId: string): Promise<string> => {
  "use cache";
  cacheLife("hours");

  const client = getNotionClient();
  const lines = await getBlockMarkdown(client, pageId);

  return lines.join("\n\n");
};
