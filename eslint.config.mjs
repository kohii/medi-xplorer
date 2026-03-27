import coreWebVitalsConfig from "eslint-config-next/core-web-vitals";
import tsConfig from "eslint-config-next/typescript";

// Extract plugin references from the base config
const nextConfig = coreWebVitalsConfig.find((c) => c.name === "next");

export default [
  {
    ignores: [".claude/"],
  },
  ...coreWebVitalsConfig,
  ...tsConfig,
  {
    plugins: {
      react: nextConfig.plugins.react,
      import: nextConfig.plugins.import,
      "@typescript-eslint": tsConfig.find((c) => c.plugins?.["@typescript-eslint"])?.plugins[
        "@typescript-eslint"
      ],
    },
    rules: {
      semi: ["error", "always"],
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-wrap-multilines": [
        "error",
        {
          prop: "ignore",
          declaration: "ignore",
          assignment: "parens-new-line",
          return: "parens-new-line",
          arrow: "parens-new-line",
          condition: "ignore",
          logical: "parens",
        },
      ],
      "react/jsx-max-props-per-line": [
        "error",
        {
          maximum: 1,
          when: "multiline",
        },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
];
