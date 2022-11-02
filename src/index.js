import { createFilter } from "@rollup/pluginutils"
import istanbul from "istanbul-lib-instrument"

export default function (options = {}) {
	const filter = createFilter(options.include, options.exclude)

	return {
		name: "istanbul",
		transform(code, id) {
			if (!filter(id)) {
				return
			}

			const instrumenterConfig = Object.assign(
				{
					esModules: true,
					compact: true,
					produceSourceMap: true,
					autoWrap: true,
					preserveComments: true,
				},
				options.instrumenterConfig,
			)

			const instrumenter = new (
				options.instrumenter || istanbul
			).createInstrumenter(instrumenterConfig)

			const { version, sources, sourcesContent, names, mappings, file } =
				this.getCombinedSourcemap()

			const instrumentedCode = instrumenter.instrumentSync(code, id, {
				version,
				sources,
				sourcesContent,
				names,
				mappings,
				file,
			})

			return { code: instrumentedCode, map: instrumenter.lastSourceMap() }
		},
	}
}
