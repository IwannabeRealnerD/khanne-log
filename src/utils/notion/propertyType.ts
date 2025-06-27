export const globalGetTitle = (property: any): string | null => {
  if (property?.type === "title" && property.title[0]?.plain_text) {
    return property.title[0].plain_text;
  }
  return null;
};

export const globalGetRichText = (property: any): string | null => {
  if (property?.type === "rich_text" && property.rich_text[0]?.plain_text) {
    return property.rich_text[0].plain_text;
  }
  return null;
};

export const globalGetSelect = (property: any): string | null => {
  if (property?.type === "select" && property.select?.name) {
    return property.select.name;
  }
  return null;
};

export const globalGetMultiSelect = (property: any): string[] => {
  if (property?.type === "multi_select") {
    return property.multi_select.map((item: { name: string }) => item.name);
  }
  return [];
};

export const globalGetCreatedTime = (property: any): string | null => {
  if (property?.type === "created_time" && property.created_time) {
    return property.created_time;
  }
  return null;
};

export const globalGetCheckbox = (property: any): boolean => {
  if (property?.type === "checkbox" && property.checkbox) {
    return property.checkbox;
  }
  return false;
};
