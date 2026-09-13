import type { GlobalReview } from "./database-scheme";

export type GlobalReviewPageData = GlobalReview & {
  edited_date: string;
  one_liner: string | null;
};

export type GlobalReviewDetail = GlobalReviewPageData & {
  markdown: string;
};
