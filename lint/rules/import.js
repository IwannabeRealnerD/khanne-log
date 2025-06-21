import importPlugin from "eslint-plugin-import";

export const importRules = {
  ...importPlugin.flatConfigs.recommended.rules,
  "import/no-duplicates": "error",
  "import/no-empty-named-blocks": "error",
  "import/no-named-as-default": "error",
  "import/no-named-as-default-member": "error",
  "import/no-cycle": "error",
  "import/no-self-import": "error",
  "import/no-namespace": "error",
  "import/no-anonymous-default-export": "off",
  "import/no-extraneous-dependencies": "off",
  "import/order": [
    "error",
    {
      alphabetize: {
        caseInsensitive: true,
        order: "asc",
      },
      distinctGroup: false,
      groups: ["builtin", "external", "internal", "parent", ["index", "sibling"]],
      "newlines-between": "always",
      pathGroups: [
        {
          group: "builtin",
          pattern: "react",
          position: "before",
        },
        {
          group: "builtin",
          pattern: "next",
          position: "before",
        },
        {
          group: "builtin",
          pattern: "next/**",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: [],
    },
  ],
  "no-restricted-imports": [
    "error",
    {
      paths: [
        {
          importNames: ["it"],
          message: 'Please use "test" instead of "it" from vitest.',
          name: "vitest",
        },
      ],
    },
  ],
};
