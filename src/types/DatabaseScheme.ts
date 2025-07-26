import { object, string, array, nullable, boolean, InferInput } from "valibot";

import { GlobalOttServiceNameSchema } from "@/types/OttServiceName";

export const GlobalLineScheme = object({
  id: string(),
  title: string(),
  quote: nullable(string()),
  from: GlobalOttServiceNameSchema,
  scene_description: string(),
  key_points: array(string()),
  comment: string(),
  when: string(),
  added_date: string(),
  is_spoiler: boolean(),
});

export type GlobalLine = InferInput<typeof GlobalLineScheme>;
