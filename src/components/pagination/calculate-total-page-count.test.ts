import { describe, expect, test } from "vitest";

import { calculateTotalPageCount } from "./calculate-total-page-count";

describe("src/components/pagination/calculate-total-page-count -> calculateTotalPageCount", () => {
  test.each([
    { itemCount: 0, itemsPerPage: 3, expected: 0 },
    { itemCount: 3, itemsPerPage: 3, expected: 1 },
    { itemCount: 4, itemsPerPage: 3, expected: 2 },
    { itemCount: 29, itemsPerPage: 3, expected: 10 },
  ])(
    "returns $expected pages when there are $itemCount items and $itemsPerPage items per page",
    ({ itemCount, itemsPerPage, expected }) => {
      expect(calculateTotalPageCount(itemCount, itemsPerPage)).toBe(expected);
    }
  );
});
