import { describe, beforeEach, test, expect } from "vitest";

import { GLOBAL_DATE_PREFIX } from "@/constants/date";
import {
  globalGetSessionStorage as originalGlobalGetSessionStorage,
  globalRemoveSessionStorage as originalGlobalRemoveSessionStorage,
  globalSetSessionStorage as originalGlobalSetSessionStorage,
} from "@/utils/globalSessionStorage";

interface TestSessionStorage {
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

type OverriddenGlobalGetSessionStorage = <K extends keyof TestSessionStorage>(key: K) => TestSessionStorage[K] | null;
type OverriddenGlobalRemoveSessionStorage = (key: keyof TestSessionStorage) => void;
type OverriddenGlobalSetSessionStorage = <K extends keyof TestSessionStorage>(
  key: K,
  value: TestSessionStorage[K] | Date
) => void;

const globalSetSessionStorage = originalGlobalSetSessionStorage as OverriddenGlobalSetSessionStorage;
const globalGetSessionStorage = originalGlobalGetSessionStorage as OverriddenGlobalGetSessionStorage;
const globalRemoveSessionStorage =
  originalGlobalRemoveSessionStorage as unknown as OverriddenGlobalRemoveSessionStorage;

describe("sharedSessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should set string primitive value", () => {
    globalSetSessionStorage("string", "testToken");
    const result = sessionStorage.getItem("string");
    expect(result).toBe('"testToken"');
  });

  test("should set date value with __date__ prefix", () => {
    const date = new Date();
    globalSetSessionStorage("testDate", date);
    const result = JSON.parse(sessionStorage.getItem("testDate") as string);
    const expectedResult = `${GLOBAL_DATE_PREFIX}${date.toISOString()}`;
    expect(result).toEqual(expectedResult);
  });

  test("should get date value", () => {
    const date = new Date();
    const setValue = JSON.stringify(`${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    sessionStorage.setItem("testDate", setValue);
    const expectedValue = date;
    const result = globalGetSessionStorage("testDate");
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
    globalSetSessionStorage("nestedExample", setValue);
    const expectedValue = {
      lv1: {
        lv2: {
          ...setValue.lv1.lv2,
          date: `${GLOBAL_DATE_PREFIX}${date.toISOString()}`,
        },
      },
    };
    const result = JSON.parse(sessionStorage.getItem("nestedExample") as string);
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
    sessionStorage.setItem("nestedExample", JSON.stringify(setValue));
    const result = globalGetSessionStorage("nestedExample");
    expect(result).toEqual(expectedValue);
  });

  test("should remove value", () => {
    sessionStorage.setItem("string", "value");
    globalRemoveSessionStorage("string");
    const result = sessionStorage.getItem("string");
    expect(result).toBeNull();
  });

  test("should return null when querying non-existent key", () => {
    const result = globalGetSessionStorage("nonExistentKey" as keyof TestSessionStorage);
    expect(result).toBeNull();
  });

  test("should set array value", () => {
    const array = ["test", "test2", "test3"];
    globalSetSessionStorage("testStringArray", array);
    const result = sessionStorage.getItem("testStringArray");
    expect(result).toEqual(JSON.stringify(array));
  });

  test("should get array value", () => {
    const array = ["test", "test2", "test3"];
    sessionStorage.setItem("testStringArray", JSON.stringify(array));
    const result = globalGetSessionStorage("testStringArray");
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
    globalSetSessionStorage("testNestedObjectArray", array);
    const result = sessionStorage.getItem("testNestedObjectArray");
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
    sessionStorage.setItem("testNestedObjectArray", JSON.stringify(array));
    const result = globalGetSessionStorage("testNestedObjectArray");
    expect(result).toEqual(array);
  });

  test("should set number array value", () => {
    const number = [1, 2, 3];
    globalSetSessionStorage("testNumberArray", number);
    const result = sessionStorage.getItem("testNumberArray");
    expect(result).toEqual(JSON.stringify(number));
  });

  test("should get number array value", () => {
    const number = [1, 2, 3];
    sessionStorage.setItem("testNumberArray", JSON.stringify(number));
    const result = globalGetSessionStorage("testNumberArray");
    expect(result).toEqual(number);
  });

  test("should set date array value", () => {
    const array = [new Date(), new Date(), new Date()];
    const expectedValue = array.map((date) => `${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    globalSetSessionStorage("testDateArray", array);
    const result = sessionStorage.getItem("testDateArray");
    expect(result).toEqual(JSON.stringify(expectedValue));
  });

  test("should get date array value", () => {
    const array = [new Date(), new Date(), new Date()];
    const expectedValue = array.map((date) => `${GLOBAL_DATE_PREFIX}${date.toISOString()}`);
    sessionStorage.setItem("testDateArray", JSON.stringify(expectedValue));
    const result = globalGetSessionStorage("testDateArray");
    expect(result?.every((date) => date instanceof Date)).toBe(true);
    expect(result).toEqual(array);
  });
});
