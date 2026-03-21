import { GlobalLine } from "./database-scheme";

export interface GlobalLineResponse {
  fetchedAt: string;
  data: GlobalLine[];
}
