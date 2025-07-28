import { describe, expect, test } from "vitest";

import { internalGenerateVisiblePages } from "@/components/pagination/internal/generateVisiblePages";

describe("internalGenerateVisiblePages", () => {
  describe("when total pages are less than or equal to the max display pages", () => {
    test("when total pages are 4, it should return all page numbers", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 1,
        totalDataCount: 12,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([1, 2, 3, 4]);
    });

    test("when total pages are 5, it should return all page numbers", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 1,
        totalDataCount: 15,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([1, 2, 3, 4, 5]);
    });

    test("even if the last page is not full, it should return all page numbers", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 1,
        totalDataCount: 14,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([1, 2, 3, 4, 5]);
    });
    test("should return a centered page list that ends on the last page", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 5,
        totalDataCount: 20,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([3, 4, 5, 6, 7]);
    });
  });

  describe("when total pages are greater than the max display pages", () => {
    test("when the current page is at the beginning, it should return the first 5 pages", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 1,
        totalDataCount: 55,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([1, 2, 3, 4, 5]);
    });

    test("when the current page is at the end, it should return the last 5 pages", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 11,
        totalDataCount: 36,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([8, 9, 10, 11, 12]);
    });

    test("when the current page is in the middle, it should return 5 pages around the current page", () => {
      const result = internalGenerateVisiblePages({
        currentPage: 6,
        totalDataCount: 33,
        itemsPerPage: 3,
      });
      expect(result.pages).toEqual([4, 5, 6, 7, 8]);
    });
  });
});
