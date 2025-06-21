import js from "@eslint/js";

export const eslintRules = {
  ...js.configs.recommended.rules,
  "object-shorthand": ["error", "always"],
  "no-unused-vars": "off",
  "arrow-body-style": "off",
};
