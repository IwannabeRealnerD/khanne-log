import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export const namingConventionConfigs = defineConfig([
  {
    files: ["src/constants/*.{ts,tsx}", "src/constants/*/index.{ts,tsx}"],
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
    files: ["src/utils/*.{ts,tsx}", "src/utils/*/index.{ts,tsx}"],
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
    files: ["src/hooks/*.{ts,tsx}", "src/hooks/*/index.{ts,tsx}"],
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
    files: ["src/types/*.{ts,tsx}", "src/types/*/index.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["StrictPascalCase"],
          modifiers: ["exported"],
          prefix: ["Global"],
          selector: ["typeAlias", "interface", "enum"],
        },
      ],
    },
  },
  {
    files: ["src/components/*.{ts,tsx}", "src/components/*/index.{ts,tsx}"],
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
    files: ["src/apis/hooks/**.tsx"],
    ignores: ["src/apis/hooks/**/{utils}/**/*.{ts,tsx}"],
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
