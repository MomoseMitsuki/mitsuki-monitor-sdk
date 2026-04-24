import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-plugin-prettier/recommended";
import pluginOxlint from "eslint-plugin-oxlint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const ignores = ["**/*.d.ts", "**/node_modules/**", "**/dist/**", "**/scripts/**"];

export default defineConfig(
	{
		ignores,
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			eslintConfigPrettier,
			...pluginOxlint.buildFromOxlintConfigFile(".oxlintrc.json")
		],
		plugins: {
			prettier: eslintPluginPrettier
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tseslint.parser,
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: "./tsconfig.json"
			}
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"no-unused-expressions": "off",
			"no-var": "error",
			"no-empty": "off"
		}
	},
	{
		ignores,
		files: ["examples/react/*.{ts,js,tsx,jsx}"],
		extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite]
	}
);
