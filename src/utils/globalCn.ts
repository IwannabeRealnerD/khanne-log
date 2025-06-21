import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const globalCn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
