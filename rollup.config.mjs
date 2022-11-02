export default {
	input: "src/index.js",
	external: ["istanbul-lib-instrument", "@rollup/pluginutils"],
	output: [
		{
			format: "cjs",
			file: "dist/rollup-plugin-istanbul.cjs",
			exports: "default",
		},
		{
			format: "es",
			file: "dist/rollup-plugin-istanbul.mjs",
			exports: "default",
		},
	],
}
