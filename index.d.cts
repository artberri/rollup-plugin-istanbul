import type {
	Instrumenter as _Instrumenter,
	InstrumenterConfig as _InstrumenterConfig,
	RollupIstanbulOptions as _RollupIstanbulOptions,
} from "./index.js"
import type { Plugin } from "rollup"

declare function istanbul(options?: istanbul.RollupIstanbulOptions): Plugin

declare namespace istanbul {
	type Instrumenter = _Instrumenter
	type InstrumenterConfig = _InstrumenterConfig
	type RollupIstanbulOptions = _RollupIstanbulOptions
}

export = istanbul
