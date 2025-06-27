/** @type {import("eslint").Linter.Config[]} */
export const commitRules = {
  "unused-imports/no-unused-vars": [
    "error",
    {
      args: "after-used",
      argsIgnorePattern: "^_",
      vars: "all",
      varsIgnorePattern: "^_",
    },
  ],
  "no-console": "error",
};
