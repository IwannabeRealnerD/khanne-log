import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BaseSchema, parse } from "valibot";

type NotionProperty = PageObjectResponse["properties"][string];

export const internalGetTitle = (property: NotionProperty, schema: BaseSchema<any, any, any>): string => {
  if (property.type !== "title") {
    throw new Error("Property is not a title");
  }
  const parsed = parse(schema, property.title[0].plain_text);
  return parsed;
};

export const internalGetRichText = (property: NotionProperty, schema: BaseSchema<any, any, any>): string => {
  if (property.type !== "rich_text") {
    throw new Error("Property is not a rich text");
  }
  const value = property.rich_text[0]?.plain_text ?? null;
  const parsed = parse(schema, value);
  return parsed;
};

export const internalGetSelectAsEnum = <T extends BaseSchema<any, any, any>>(
  property: NotionProperty,
  schema: T
): Partial<T> | null => {
  if (property.type !== "select") {
    throw new Error("Property is not a select");
  }
  const parsed = parse(schema, property.select?.name);
  return parsed;
};
export const internalGetMultiSelect = (property: NotionProperty): string[] => {
  if (property.type === "multi_select") {
    return property.multi_select.map((item: { name: string }) => item.name);
  }
  return [];
};

export const internalGetCreatedTime = (property: NotionProperty, schema: BaseSchema<any, any, any>): string => {
  if (property.type !== "created_time") {
    throw new Error("Property is not a created time");
  }
  const parsed = parse(schema, property.created_time);
  return parsed;
};

export const internalGetCheckbox = (property: NotionProperty, schema: BaseSchema<any, any, any>): boolean => {
  if (property.type !== "checkbox") {
    throw new Error("Property is not a checkbox");
  }
  const parsed = parse(schema, property.checkbox);
  return parsed;
};
