const assert = require("assert")
const rollup = require("rollup")
const istanbulPlugin = require("..")

process.chdir(__dirname)

describe("rollup-plugin-istanbul", function () {
	this.timeout(15000)

	it("transforms code through istanbul instrumenter", function () {
		return rollup
			.rollup({
				input: "fixtures/main.js",
				plugins: [istanbulPlugin()],
			})
			.then((bundle) => {
				return bundle.generate({
					format: "iife",
					name: "test",
					globals: {
						whatever: "whatever",
					},
				})
			})
			.then((generated) => {
				const code = generated.output[0].code
				assert.ok(code.indexOf("coverage[path]") !== -1, code)
			})
	})

	it("adds the file name properly", function () {
		return rollup
			.rollup({
				input: "fixtures/main.js",
				plugins: [istanbulPlugin()],
			})
			.then((bundle) => {
				return bundle.generate({
					format: "iife",
					name: "test",
					globals: {
						whatever: "whatever",
					},
				})
			})
			.then((generated) => {
				const code = generated.output[0].code
				assert.ok(code.indexOf("fixtures/main.js") !== -1, code)
			})
	})

	it("transforms code through istanbul instrumenter with source map", function () {
		return rollup
			.rollup({
				input: "fixtures/main.js",
				plugins: [
					istanbulPlugin({
						instrumenterConfig: {
							produceSourceMap: false,
							compact: false,
						},
					}),
				],
			})
			.then((bundle) => {
				return bundle.generate({
					sourcemap: true,
					format: "iife",
					name: "test",
					globals: {
						whatever: "whatever",
					},
				})
			})
			.then((generated) => {
				const { map } = generated.output[0]

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
	})
})
