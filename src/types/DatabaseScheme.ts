import { object, string, array, nullable, boolean, InferInput } from "valibot";

export const LineScheme = object({
  id: string(),
  title: nullable(string()),
  quote: nullable(string()),
  from: nullable(string()),
  scene_description: nullable(string()),
  key_points: array(string()),
  comment: nullable(string()),
  when: nullable(string()),
  added_date: nullable(string()),
  is_spoiler: boolean(),
});

export type GlobalLine = InferInput<typeof LineScheme>;
