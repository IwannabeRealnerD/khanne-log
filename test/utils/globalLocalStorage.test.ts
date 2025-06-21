import { describe, beforeEach, test, expect } from "vitest";

import { GLOBAL_DATE_PREFIX } from "@/constants/date";
import {
  globalGetLocalStorage as originalGlobalGetLocalStorage,
  globalRemoveLocalStorage as originalGlobalRemoveLocalStorage,
  globalSetLocalStorage as originalGlobalSetLocalStorage,
} from "@/utils/globalLocalStorage";

interface TestLocalStorage {
  string: string;
  testDate: Date;
  testStringArray: string[];
  testNumberArray: number[];
  testNestedObjectArray: {
    test: string;
  }[];
  testDateArray: Date[];
  nestedExample: {
    lv1: {
      lv2: {
        date: Date;
      };
    };
  };
}

type OverriddenGlobalGetLocalStorage = <K extends keyof TestLocalStorage>(key: K) => TestLocalStorage[K] | null;
type OverriddenGlobalRemoveLocalStorage = (key: keyof TestLocalStorage) => void;
type OverriddenGlobalSetLocalStorage = <K extends keyof TestLocalStorage>(
  key: K,
  value: TestLocalStorage[K] | Date
) => void;

const globalSetLocalStorage = originalGlobalSetLocalStorage as OverriddenGlobalSetLocalStorage;
const globalGetLocalStorage = originalGlobalGetLocalStorage as OverriddenGlobalGetLocalStorage;
const globalRemoveLocalStorage = originalGlobalRemoveLocalStorage as unknown as OverriddenGlobalRemoveLocalStorage;

describe("sharedLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should set string primitive value", () => {
    globalSetLocalStorage("string", "testToken");
    const result = localStorage.getItem("string");
    expect(result).toBe('"testToken"');
  });

  test("should set date value with __date__ prefix", () => {
    const date = new Date();
    globalSetLocalStorage("testDate", date);
    const result = JSON.parse(localStorage.getItem("testDate") as string);
    const expectedResult = `${GLOBAL_DATE_PREFIX}${date.toISOString()}`;
    expect(result).toEqual(expectedResult);
  });

  test("should get date value", () => {
    const date = new Date();
    const setValue = JSON.stringify(`${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    localStorage.setItem("testDate", setValue);
    const expectedValue = date;
    const result = globalGetLocalStorage("testDate");
    expect(result).toEqual(expectedValue);
  });

  test("should set nested object", () => {
    const date = new Date();
    const setValue = {
      lv1: {
        lv2: {
          date,
          null: null,
          number: 1,
          string: "string",
          undefined,
        },
      },
    };
    globalSetLocalStorage("nestedExample", setValue);
    const expectedValue = {
      lv1: {
        lv2: {
          ...setValue.lv1.lv2,
          date: `${GLOBAL_DATE_PREFIX}${date.toISOString()}`,
        },
      },
    };
    const result = JSON.parse(localStorage.getItem("nestedExample") as string);
    expect(result).toEqual(expectedValue);
  });

  test("should get nested object", () => {
    const date = new Date();
    const expectedValue = {
      lv1: {
        lv2: {
          date,
          null: null,
          number: 1,
          string: "string",
          undefined,
        },
      },
    };
    const setValue = {
      lv1: {
        lv2: {
          ...expectedValue.lv1.lv2,
          date: `${GLOBAL_DATE_PREFIX}${date.toISOString()}`,
        },
      },
    };
    localStorage.setItem("nestedExample", JSON.stringify(setValue));
    const result = globalGetLocalStorage("nestedExample");
    expect(result).toEqual(expectedValue);
  });

  test("should remove value", () => {
    localStorage.setItem("string", "value");
    globalRemoveLocalStorage("string");
    const result = localStorage.getItem("string");
    expect(result).toBeNull();
  });

  test("should return null when querying non-existent key", () => {
    const result = globalGetLocalStorage("nonExistentKey" as keyof TestLocalStorage);
    expect(result).toBeNull();
  });

  test("should  set array value", () => {
    const array = ["test", "test2", "test3"];
    globalSetLocalStorage("testStringArray", array);
    const result = localStorage.getItem("testStringArray");
    expect(result).toEqual(JSON.stringify(array));
  });

  test("should get array value", () => {
    const array = ["test", "test2", "test3"];
    localStorage.setItem("testStringArray", JSON.stringify(array));
    const result = globalGetLocalStorage("testStringArray");
    expect(result).toEqual(array);
  });

  test("should set object array value", () => {
    const array = [
      {
        test: "test",
      },
      {
        test: "test2",
      },
      {
        test: "test3",
      },
    ];
    globalSetLocalStorage("testNestedObjectArray", array);
    const result = localStorage.getItem("testNestedObjectArray");
    expect(result).toEqual(JSON.stringify(array));
  });

  test("should get object array value", () => {
    const array = [
      {
        test: "test",
      },
      {
        test: "test2",
      },
      {
        test: "test3",
      },
    ];
    localStorage.setItem("testNestedObjectArray", JSON.stringify(array));
    const result = globalGetLocalStorage("testNestedObjectArray");
    expect(result).toEqual(array);
  });

  test("should set number array value", () => {
    const number = [1, 2, 3];
    globalSetLocalStorage("testNumberArray", number);
    const result = localStorage.getItem("testNumberArray");
    expect(result).toEqual(JSON.stringify(number));
  });

  test("should get number array value", () => {
    const number = [1, 2, 3];
    localStorage.setItem("testNumberArray", JSON.stringify(number));
    const result = globalGetLocalStorage("testNumberArray");
    expect(result).toEqual(number);
  });

  test("should set date array value", () => {
    const array = [new Date(), new Date(), new Date()];
    const expectedValue = array.map((date) => `${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    globalSetLocalStorage("testDateArray", array);
    const result = localStorage.getItem("testDateArray");
    expect(result).toEqual(JSON.stringify(expectedValue));
  });

  test("should get date array value", () => {
    const array = [new Date(), new Date(), new Date()];
    const expectedValue = array.map((date) => `${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    localStorage.setItem("testDateArray", JSON.stringify(expectedValue));
    const result = globalGetLocalStorage("testDateArray");
    expect(result?.every((date) => date instanceof Date)).toBe(true);
    expect(result).toEqual(array);
  });
});
