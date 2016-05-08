import { createFilter } from 'rollup-pluginutils';
import istanbul from 'istanbul';

export default function (options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform (code, id) {
      if (!filter(id)) return;

      var InstrumenterImpl = (options.instrumenter || istanbul).Instrumenter;
      var instrumenterOptions = options.instrumenterConfig || { esModules: true };

      var instrumenter = new InstrumenterImpl(instrumenterOptions);

      code = instrumenter.instrumentSync(code, id);

      return {
        code,
        map: { mappings: '' }
      };
    }
  };
}
