import { InferInput, picklist } from "valibot";

export const GlobalOttServiceNameSchema = picklist(["Netflix", "Apple TV+", "HBO max", "Disney Plus", "Movie"]);

export type GlobalOttServiceName = InferInput<typeof GlobalOttServiceNameSchema>;
