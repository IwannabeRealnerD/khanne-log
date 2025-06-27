import tseslint from "typescript-eslint";
export const typescriptRules = {
  ...tseslint.configs.strictTypeChecked.rules,
  ...tseslint.configs.stylisticTypeChecked.rules,
  "@typescript-eslint/consistent-type-definitions": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unused-vars": "off",
};
