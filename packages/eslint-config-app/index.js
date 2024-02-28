const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");
/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [...[
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
  ].map(require.resolve),
    "turbo",
    "prettier",
    "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended"],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "prettier/prettier": "warn",
    "import/no-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "react/no-unescaped-entities": 0,
    "no-useless-escape": "off",
    "no-redeclare": "off",
    "@typescript-eslint/explicit-function-return-type":"off",
    "@typescript-eslint/no-misused-promises":"off",
    "eslint-disable-next-line eslint-comments/require-description": "off",
    "tailwindcss/no-custom-classname": "error",
    "tailwindcss/no-contradicting-classname": "error"
  },
  "plugins": ["tailwindcss","storybook","prettier"]
};