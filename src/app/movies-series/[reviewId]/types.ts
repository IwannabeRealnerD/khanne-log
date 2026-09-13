import type { GlobalReview } from "@/types/database-scheme";

export type ReviewPageData = GlobalReview & {
  edited_date: string;
  one_liner: string | null;
};

export type ReviewDetail = ReviewPageData & {
  markdown: string;
};
