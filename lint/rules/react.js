import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";

export const reactRules = {
  ...jsxA11y.flatConfigs.recommended.rules,
  ...reactPlugin.configs.recommended.rules,
  "react/display-name": "off",
  "react/jsx-no-target-blank": "off",
  "react/jsx-sort-props": [
    "error",
    {
      callbacksLast: true,
      ignoreCase: true,
      noSortAlphabetically: false,
      reservedFirst: true,
      shorthandFirst: true,
      shorthandLast: false,
    },
  ],
  "react/no-unknown-property": "off",
  "react/prop-types": "off",
  "react/react-in-jsx-scope": "off",
  "react/jsx-uses-react": "off",
  "react/destructuring-assignment": "off",
  "react/function-component-definition": [
    "error",
    {
      namedComponents: "arrow-function",
      unnamedComponents: "arrow-function",
    },
  ],
  "react/jsx-filename-extension": [
    "error",
    {
      extensions: [".jsx", ".tsx"],
    },
  ],
  "react/jsx-props-no-spreading": "off",
  "react/require-default-props": "off",
  "jsx-a11y/alt-text": [
    "warn",
    {
      elements: ["img"],
      img: ["Image"],
    },
  ],
  "jsx-a11y/aria-props": "error",
  "jsx-a11y/aria-proptypes": "error",
  "jsx-a11y/aria-unsupported-elements": "error",
  "jsx-a11y/role-has-required-aria-props": "error",
  "jsx-a11y/role-supports-aria-props": "error",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "error",
};
