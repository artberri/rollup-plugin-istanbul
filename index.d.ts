import type { FilterPattern } from "@rollup/pluginutils"
import type { Plugin } from "rollup"

/**
 * Options passed to Istanbul's `createInstrumenter`. See
 * https://github.com/istanbuljs/istanbuljs/blob/main/packages/istanbul-lib-instrument/api.md
 */
export interface InstrumenterConfig {
	/** Name of the global coverage variable. @default "__coverage__" */
	coverageVariable?: string
	/** Report the boolean value of logical expressions. @default false */
	reportLogic?: boolean
	/** Preserve comments in the output. @default true */
	preserveComments?: boolean
	/** Generate compact code. @default true */
	compact?: boolean
	/** Instrument ES modules. @default true */
	esModules?: boolean
	/** Allow `return` statements outside of functions. @default true */
	autoWrap?: boolean
	/** Produce a source map for the instrumented code. @default true */
	produceSourceMap?: boolean
	/** Class method names to leave out of coverage. @default [] */
	ignoreClassMethods?: string[]
	/** Called when a source map URL is found in the original code. */
	sourceMapUrlCallback?: (filename: string, url: string) => void
	/** Turn on debugging. @default false */
	debug?: boolean
	/** Babel parser plugins. */
	parserPlugins?: unknown[]
	/** Scope of the global coverage variable. @default "this" */
	coverageGlobalScope?: string
	/** Use an evaluated function to find `coverageGlobalScope`. @default true */
	coverageGlobalScopeFunc?: boolean
	/** Babel generator options. */
	generatorOpts?: Record<string, unknown>
	[option: string]: unknown
}

/** A replacement for `istanbul-lib-instrument` with the same API. */
export interface Instrumenter {
	createInstrumenter(config: InstrumenterConfig): {
		instrumentSync(
			code: string,
			filename: string,
			inputSourceMap?: unknown,
		): string
		lastSourceMap(): unknown
	}
}

export interface RollupIstanbulOptions {
	/** Files to instrument. Defaults to every file. */
	include?: FilterPattern
	/** Files not to instrument, commonly the test files. */
	exclude?: FilterPattern
	/** Options passed to the instrumenter, merged over the plugin's defaults. */
	instrumenterConfig?: InstrumenterConfig
	/** A replacement for `istanbul-lib-instrument`. */
	instrumenter?: Instrumenter
}

export default function istanbul(options?: RollupIstanbulOptions): Plugin
