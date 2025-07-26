import { picklist } from "valibot";

export const GlobalOttServiceNameSchema = picklist(["Netflix", "Apple TV+", "HBO max", "Disney Plus", "Movie"]);
