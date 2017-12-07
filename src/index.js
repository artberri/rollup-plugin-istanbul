import { createFilter } from 'rollup-pluginutils';
import istanbul from 'istanbul-lib-instrument';

export default function (options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform (code, id) {
      if (!filter(id)) return;

      let instrumenter;
      let sourceMap = !!options.sourceMap;
      let opts = Object.assign({}, options.instrumenterConfig);

      if (sourceMap) {
        opts.codeGenerationOptions = Object.assign({},
          opts.codeGenerationOptions || {format: {compact: !opts.noCompact}},
          {sourceMap: id, sourceMapWithCode: true}
        );
      }

      opts.esModules = true;
      instrumenter = new (options.instrumenter || istanbul).createInstrumenter(opts);

      code = instrumenter.instrumentSync(code, id);

      let map = sourceMap ?
        instrumenter.lastSourceMap().toJSON() :
        {mappings: ''};

      return { code, map };
    }
  };
}
