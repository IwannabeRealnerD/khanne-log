import { describe, expect, test } from "vitest";

import { internalGenerateVisiblePages } from "@/components/pagination/internal/generateVisiblePages";

describe("internalGenerateVisiblePages", () => {
  describe("when total pages are less than or equal to the max display pages", () => {
    test("when total pages are 5, it should return all page numbers", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 1,
        totalPageCount: 5,
      });
      expect(result.pages).toEqual([1, 2, 3, 4, 5]);
      expect(result.firstPage).toBeNull();
      expect(result.lastPage).toBeNull();
    });

    test("when total pages are smaller than the max display pages, it should return all pages", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 3,
        totalPageCount: 4,
      });
      expect(result.pages).toEqual([1, 2, 3, 4]);
      expect(result.firstPage).toBeNull();
      expect(result.lastPage).toBeNull();
    });
  });

  describe("when total pages are greater than the max display pages", () => {
    test("when the current page is at the beginning, it should return the first 5 pages", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 1,
        totalPageCount: 10,
      });
      expect(result.pages).toEqual([1, 2, 3, 4, 5]);
      expect(result.firstPage).toBeNull();
      expect(result.lastPage).toBe(10);
    });

    test("when the current page is at the end, it should return the last 5 pages", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 10,
        totalPageCount: 10,
      });
      expect(result.pages).toEqual([6, 7, 8, 9, 10]);
      expect(result.firstPage).toBe(1);
      expect(result.lastPage).toBeNull();
    });

    test("when the current page is in the middle, it should return 5 pages around the current page", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 7,
        totalPageCount: 10,
      });
      expect(result.pages).toEqual([5, 6, 7, 8, 9]);
      expect(result.firstPage).toBe(1);
      expect(result.lastPage).toBe(10);
    });
  });
});
