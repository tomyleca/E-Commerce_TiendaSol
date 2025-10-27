import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
export default defineConfig([
  {
    files: ["packages/backend/**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime", // desactiva react/react-in-jsx-scope
    ],
    settings: { react: { version: "detect" } },
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["packages/cliente/src/**/*.{js,jsx,mjs,cjs}"],
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  {
    files: ["packages/backend/test/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]);
