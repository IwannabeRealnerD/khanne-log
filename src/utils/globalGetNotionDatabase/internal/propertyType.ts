export const internalGetTitle = (property: any): string | null => {
  if (property?.type === "title" && property.title[0]?.plain_text) {
    return property.title[0].plain_text;
  }
  return null;
};

export const internalGetRichText = (property: any): string | null => {
  if (property?.type === "rich_text" && property.rich_text[0]?.plain_text) {
    return property.rich_text[0].plain_text;
  }
  return null;
};

export const internalGetSelect = (property: any): string | null => {
  if (property?.type === "select" && property.select?.name) {
    return property.select.name;
  }
  return null;
};

export const internalGetMultiSelect = (property: any): string[] => {
  if (property?.type === "multi_select") {
    return property.multi_select.map((item: { name: string }) => item.name);
  }
  return [];
};

export const internalGetCreatedTime = (property: any): string | null => {
  if (property?.type === "created_time" && property.created_time) {
    return property.created_time;
  }
  return null;
};

export const internalGetCheckbox = (property: any): boolean => {
  if (property?.type === "checkbox" && property.checkbox) {
    return property.checkbox;
  }
  return false;
};
