import { fileURLToPath } from "node:url"
import { rollup } from "rollup"

// Run from test/ so module ids, and the paths Istanbul records, are relative.
process.chdir(fileURLToPath(new URL(".", import.meta.url)))

export async function bundle(plugin, outputOptions = {}) {
	const build = await rollup({ input: "fixtures/main.js", plugins: [plugin] })
	const { output } = await build.generate({
		format: "iife",
		name: "test",
		globals: { whatever: "whatever" },
		...outputOptions,
	})
	return output[0]
}
