import assert from "node:assert/strict"
import { createRequire } from "node:module"
import { describe, it } from "node:test"
import esmPlugin from "../dist/rollup-plugin-istanbul.mjs"
import { bundle } from "./helpers.js"

const cjsPlugin = createRequire(import.meta.url)("..")

describe("built package", () => {
	for (const [format, plugin] of [
		["CommonJS", cjsPlugin],
		["ES module", esmPlugin],
	]) {
		it(`instruments code with the ${format} build`, async () => {
			const { code } = await bundle(plugin())
			assert.ok(code.includes("coverage[path]"), code)
		})
	}
})
