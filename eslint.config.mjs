import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: pluginJest.environments.globals.globals } },
  { plugins: { jest: pluginJest } },
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends("next/core-web-vitals"),
  { ignores: [".next"] },
];

/** @type {import('eslint').Linter.Config[]} */
export default eslintConfig;
