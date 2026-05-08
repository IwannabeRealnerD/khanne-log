import { object, string, array, nullable, boolean, InferInput } from "valibot";

import { GlobalOttServiceNameSchema } from "@/types/ott-service-name";

export const GlobalLineScheme = object({
  id: string(),
  title: string(),
  quote: nullable(string()),
  from: GlobalOttServiceNameSchema,
  scene_description: string(),
  key_points: array(string()),
  when: string(),
  added_date: string(),
  is_spoiler: boolean(),
});

export type GlobalLine = InferInput<typeof GlobalLineScheme>;

export const GlobalReviewScheme = object({
  id: string(),
  title: string(),
  from: array(string()),
  key_points: array(string()),
  added_date: string(),
  is_done: boolean(),
});

export type GlobalReview = InferInput<typeof GlobalReviewScheme>;
