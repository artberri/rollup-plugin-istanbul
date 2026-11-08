import assert from "node:assert/strict"
import { describe, it } from "node:test"
import istanbulPlugin from "../src/index.js"
import { bundle } from "./helpers.js"

describe("rollup-plugin-istanbul", () => {
	it("transforms code through istanbul instrumenter", async () => {
		const { code } = await bundle(istanbulPlugin())
		assert.ok(code.includes("coverage[path]"), code)
	})

	it("adds the file name properly", async () => {
		const { code } = await bundle(istanbulPlugin())
		assert.ok(code.includes("fixtures/main.js"), code)
	})

	it("transforms code through istanbul instrumenter with source map", async () => {
		const { map } = await bundle(
			istanbulPlugin({
				instrumenterConfig: { produceSourceMap: false, compact: false },
			}),
			{ sourcemap: true },
		)

		assert.deepEqual(map.sources, ["fixtures/main.js"])
		assert.deepEqual(map.sourcesContent, [
			"export const foo = (bar) => {\n" +
				"\tif (bar) {\n" +
				"\t\twhatever.do()\n" +
				"\t} else {\n" +
				"\t\twhatever.stop()\n" +
				"\t}\n" +
				"}\n",
		])
		assert.notEqual(map.mappings, "")
	})

	it("skips files excluded by the filter", async () => {
		const { code } = await bundle(istanbulPlugin({ exclude: ["**/main.js"] }))
		assert.ok(!code.includes("coverage[path]"), code)
	})
})
