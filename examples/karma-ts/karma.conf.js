const istanbul = require("rollup-plugin-istanbul")
const typescript = require("@rollup/plugin-typescript")

module.exports = (config) => {
	config.set({
		// It seems that plugins are not loaded automatically using PNPM
		plugins: [
			require("karma-rollup-preprocessor"),
			require("karma-mocha"),
			require("karma-mocha-reporter"),
			require("karma-chai"),
			require("karma-coverage"),
			require("karma-jsdom-launcher"),
		],
		basePath: "./",
		frameworks: ["mocha", "chai"],
		files: [{ pattern: "spec/**/*.spec.ts", watched: false }],
		preprocessors: {
			"spec/**/*.spec.ts": ["rollup"],
		},
		reporters: ["mocha", "coverage"],

		browsers: ["jsdom"],

		rollupPreprocessor: {
			plugins: [
				typescript(),
				istanbul({
					exclude: ["spec/**/*.spec.ts"],
					sourceMap: true,
					instrumenterConfig: {
						produceSourceMap: true,
					},
				}),
			],
			output: {
				format: "iife",
				sourcemap: "inline",
			},
		},

		coverageReporter: {
			dir: "coverage",
			includeAllSources: true,
			reporters: [
				{ type: "text" },
				{ type: "html", subdir: "html" },
				{ type: "lcov", subdir: "./" },
			],
		},
	})
}
