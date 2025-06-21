import { defineConfig } from "eslint/config";
import boundariesPlugin from "eslint-plugin-boundaries";

/** @type {import("eslint").Linter.Config[]} */
export const boundaryConfigs = defineConfig([
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries: boundariesPlugin },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "allow",
          rules: [
            {
              disallow: "pages",
              from: ["apis", "hooks", "types", "utils", "constants", "components"],
            },
          ],
        },
      ],
    },
    settings: {
      "boundaries/elements": [
        {
          pattern: "src/apis",
          type: "apis",
        },
        {
          pattern: "src/hooks",
          type: "hooks",
        },
        {
          pattern: "src/components",
          type: "components",
        },
        { pattern: "src/constants", type: "constants" },
        { pattern: "src/types", type: "types" },
        { pattern: "src/utils", type: "utils" },
        { pattern: "src/pages", type: "pages" },
        { pattern: "src/styles", type: "styles" },
      ],
    },
  },
]);
