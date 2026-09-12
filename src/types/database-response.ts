import { GlobalLine, GlobalReview } from "./database-scheme";

export interface GlobalLineResponse {
  fetchedAt: string;
  data: GlobalLine[];
}

export interface GlobalReviewResponse {
  fetchedAt: string;
  data: GlobalReview[];
}
