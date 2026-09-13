import { cacheLife } from "next/cache";

import { APIErrorCode, Client, isFullPage, isNotionClientError } from "@notionhq/client";

import { getPageMarkdown } from "@/utils/notion/get-page-markdown";

import type { ReviewDetail, ReviewPageData } from "./types";

const NOTION_PAGE_ID_PATTERN = /^(?:[\da-f]{32}|[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12})$/i;

const normalizeNotionId = (id: string): string => id.replaceAll("-", "").toLowerCase();

const getNotionClient = () => {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set");
  }

  return new Client({ auth: process.env.NOTION_API_KEY });
};

export const getReviewPageData = async (pageId: string): Promise<ReviewPageData | null> => {
  "use cache";
  cacheLife("hours");

  const databaseId = process.env.NOTION_REVIEWS_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_REVIEWS_DATABASE_ID is not set");
  }
  if (!NOTION_PAGE_ID_PATTERN.test(pageId)) {
    return null;
  }

  const client = getNotionClient();
  let page;

  try {
    const response = await client.pages.retrieve({ page_id: pageId });
    if (!isFullPage(response)) {
      return null;
    }
    page = response;
  } catch (error) {
    if (isNotionClientError(error) && error.code === APIErrorCode.ObjectNotFound) {
      return null;
    }
    throw error;
  }

  const belongsToReviewsDatabase =
    page.parent.type === "database_id" && normalizeNotionId(page.parent.database_id) === normalizeNotionId(databaseId);
  const isDoneProperty = page.properties.is_done;
  const isDone = isDoneProperty?.type === "checkbox" && isDoneProperty.checkbox;

  if (!belongsToReviewsDatabase || page.archived || page.in_trash || !isDone) {
    return null;
  }

  const titleProperty = page.properties.title;
  const fromProperty = page.properties.from;
  const keyPointsProperty = page.properties.key_points;
  const addedDateProperty = page.properties.added_date;
  const oneLinerProperty = page.properties.one_liner;

  if (
    titleProperty?.type !== "title" ||
    fromProperty?.type !== "multi_select" ||
    keyPointsProperty?.type !== "multi_select" ||
    addedDateProperty?.type !== "created_time" ||
    oneLinerProperty?.type !== "rich_text"
  ) {
    throw new Error("Review database schema does not match the expected properties");
  }

  const oneLiner = oneLinerProperty.rich_text
    .map((item) => item.plain_text)
    .join("")
    .trim();
  return {
    added_date: addedDateProperty.created_time,
    edited_date: page.last_edited_time,
    from: fromProperty.multi_select.map((item) => item.name),
    id: page.id,
    is_done: isDone,
    key_points: keyPointsProperty.multi_select.map((item) => item.name),
    one_liner: oneLiner || null,
    title: titleProperty.title.map((item) => item.plain_text).join(""),
  };
};

export const getReviewDetail = async (pageId: string): Promise<ReviewDetail | null> => {
  "use cache";
  cacheLife("hours");

  const review = await getReviewPageData(pageId);
  if (!review) {
    return null;
  }

  const markdown = await getPageMarkdown(review.id);

  return { ...review, markdown };
};
