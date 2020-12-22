import { createFilter } from '@rollup/pluginutils';
import istanbul from 'istanbul-lib-instrument';

export default function (options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'istanbul',
    transform (code, id) {
      if (!filter(id)) return;

      let instrumenter;
      const instrumenterConfig = Object.assign({
        esModules: true,
        compact: true,
        produceSourceMap: true,
        autoWrap: true,
        preserveComments: true
      }, options.instrumenterConfig);

      instrumenter = new (options.instrumenter || istanbul).createInstrumenter(instrumenterConfig);

      code = instrumenter.instrumentSync(code, id);
      const map = instrumenter.lastSourceMap();

      return { code, map };
    }
  };
}
