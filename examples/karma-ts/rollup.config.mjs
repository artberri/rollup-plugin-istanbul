import typescript from "@rollup/plugin-typescript"

export default {
	input: "src/index.ts",
	output: [
		{
			format: "iife",
			file: "./dist/example.js",
			name: "example",
		},
		{
			format: "es",
			file: "./dist/example.es.js",
		},
		{
			format: "cjs",
			file: "./dist/example.cjs.js",
		},
	],
	plugins: [typescript()],
}
