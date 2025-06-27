import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export const namingConventionConfigs = defineConfig([
  {
    files: ["src/constants/**/*.{ts,tsx}"],
    ignores: ["src/constants/**/internal/**/*.{ts,tsx}"],
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
    ignores: ["src/utils/**/internal/**/*.{ts,tsx}"],
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
    ignores: ["src/hooks/**/internal/**/*.{ts,tsx}"],
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
    ignores: ["src/types/**/internal/**/*.{ts,tsx}"],
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
    ignores: ["src/components/**/internal/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
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
    ignores: ["src/apis/**/internal/**/*.{ts,tsx}"],
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
    ignores: ["src/apis/hooks/**/internal/**/*.{ts,tsx}"],
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
    files: ["src/**/internal/**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase", "UPPER_CASE"],
          modifiers: ["exported"],
          prefix: ["internal", "Internal", "INTERNAL_"],
          selector: ["function", "variable", "typeAlias", "interface"],
        },
      ],
    },
  },
  {
    files: ["src/app/**/page.tsx"],
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
  {
    files: ["src/app/**/layout.tsx"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          selector: ["function", "variable"],
          suffix: ["Layout", "metadata"],
        },
      ],
    },
  },
]);
