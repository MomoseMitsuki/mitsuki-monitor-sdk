import path from "node:path";
import URL from "node:url";
import fs from "node:fs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = ["core"];

function getPackageRoots() {
	return packages.map(pkg => path.resolve(__dirname, "../packages", pkg));
}

async function packageJson(root) {
	const jsonPath = path.resolve(root, "package.json");
	const content = await fs.promises.readFile(jsonPath, "utf-8");
	return JSON.parse(content);
}

async function getRollupConfig(root) {
	const config = await packageJson(root);
	const tsconfig = path.resolve(root, "tsconfig.json");
	const { name, formats } = config.buildOptions || {};
	const dist = path.resolve(root, "./dist");
	const entry = path.resolve(root, "./src/index.ts");
	const rollupOptions = {
		input: entry,
		sourcemap: false,
		plugins: [del({ targets: dist }), nodeResolve(), typescript({ tsconfig }), commonjs()],
		dir: dist
	};
	const output = [];
	for (const format of formats) {
		let ext = "";
		if (format === "esm") {
			ext = "mjs";
		} else if (format == "cjs") {
			ext = "cjs";
		} else {
			ext = `${format}.js`;
		}
		const outputItem = {
			format,
			dir: dist,
			chunkFileNames: `[name]-[hash].${ext}`,
			entryFileNames: `[name].${ext}`
		};
		if (format === "iife") {
			outputItem.name = name;
		}
		output.push(outputItem);
	}
	rollupOptions.output = output;
	rollupOptions.watch = {
		include: path.resolve(root, "src/**"),
		exclude: path.resolve(root, "node_modules/**"),
		clearScreen: false
	};
	return rollupOptions;
}

export async function getRollupConfigs() {
	const roots = getPackageRoots();
	const configs = await Promise.all(roots.map(getRollupConfig));
	const result = {};
	for (let i = 0; i < packages.length; i++) {
		result[packages[i]] = configs[i];
	}
	return result;
}
