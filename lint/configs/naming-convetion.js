import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export const namingConventionConfigs = defineConfig([
  {
    files: ["src/constants/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["UPPER_CASE"],
          modifiers: ["exported"],
          prefix: ["GLOBAL_"],
          selector: "variable",
        },
      ],
    },
  },
  {
    files: ["src/utils/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["global"],
          selector: ["function", "variable"],
        },
      ],
    },
  },
  {
    files: ["src/hooks/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["useGlobal"],
          selector: ["function", "variable"],
        },
      ],
    },
  },
  {
    files: ["src/types/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["Global"],
          selector: ["typeAlias", "interface"],
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    ignores: ["src/components/**/internal/**"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["Global"],
          selector: ["variable", "function"],
        },
      ],
    },
  },
  {
    files: ["src/apis/**/*.+(ts|tsx)"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["useGlobalGet", "useGlobalPost", "useGlobalDelete", "useGlobalPatch"],
          selector: ["function", "variable"],
        },
      ],
    },
  },
  {
    files: ["src/apis/hooks/**.tsx"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["useGlobalGet", "useGlobalPost", "useGlobalDelete", "useGlobalPatch"],
          selector: ["function", "variable"],
        },
      ],
    },
  },
  {
    files: ["src/pages/**/**.page.tsx"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          selector: ["function", "variable"],
          suffix: ["Page"],
        },
      ],
    },
  },
]);
