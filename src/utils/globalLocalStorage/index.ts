import { GLOBAL_DATE_PREFIX } from "@/constants/date";

import { LocalStorage } from "./type";

export const globalGetLocalStorage = <T extends keyof LocalStorage>(key: T) => {
  const storageValue = localStorage.getItem(key);
  if (storageValue) {
    return JSON.parse(storageValue, (_, value) => {
      if (typeof value === "string" && value.startsWith(GLOBAL_DATE_PREFIX)) {
        return new Date(value.slice(GLOBAL_DATE_PREFIX.length));
      }
      return value;
    }) as LocalStorage[T];
  }
  return null;
};

export const globalSetLocalStorage = <K extends keyof LocalStorage>(key: K, value: LocalStorage[K]) => {
  const serializeData = (deSerializedValue: unknown): unknown => {
    if (deSerializedValue instanceof Date) {
      return `${GLOBAL_DATE_PREFIX}${deSerializedValue.toISOString()}`;
    }
    if (deSerializedValue === null) {
      return null;
    }
    if (Array.isArray(deSerializedValue)) {
      return deSerializedValue.map((item) => serializeData(item));
    }
    if (typeof deSerializedValue === "object") {
      return Object.fromEntries(
        Object.entries(deSerializedValue).map(([_key, _value]) => [_key, serializeData(_value)])
      );
    }
    return deSerializedValue;
  };
  localStorage.setItem(key, JSON.stringify(serializeData(value)));
};

export const globalRemoveLocalStorage = (key: keyof LocalStorage) => {
  localStorage.removeItem(key);
};
