import { defineConfig } from "eslint/config";

export const onlyGlobalCn = defineConfig([
  {
    ignores: ["src/utils/globalCn.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message: 'Please use "globalCn" instead of "clsx" from clsx library itself.',
              name: "clsx",
            },
            {
              message: 'Please use "globalCn" instead of "tailwind-merge".',
              name: "tailwind-merge",
            },
          ],
        },
      ],
    },
  },
]);
