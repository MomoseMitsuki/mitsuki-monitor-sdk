import { getRollupConfigs } from "./buildBase.mjs";
import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";

async function build() {
	const configs = await getRollupConfigs();
	for (const name in configs) {
		const config = configs[name];
		console.log(`📦 正在打包: ${name}`);
		const bundle = await rollup({
			input: config.input,
			plugins: [...config.plugins, terser()],
			external: config.external
		});
		const tasks = [];
		for (const output of config.output) {
			tasks.push(bundle.write(output));
		}
		await Promise.all(tasks);
		console.log(`✅ ${name} 打包完成`);
	}
}

build();
