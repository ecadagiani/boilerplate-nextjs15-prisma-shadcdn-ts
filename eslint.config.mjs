import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  stylistic.configs["recommended-flat"],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
  ),
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/max-len": ["warn", { code: 150 }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      // "@stylistic/array-element-newline": ["warn", "consistent"],
      // "@stylistic/object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
      // "@stylistic/object-curly-spacing": ["warn", "always"],
      // "@stylistic/no-extra-parens": "off",
      // "@stylistic/quote-props": "off",
      // "@stylistic/padded-blocks": "off",
      // "@stylistic/multiline-comment-style": ["error", "separate-lines", { checkJSDoc: false }],
    },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
