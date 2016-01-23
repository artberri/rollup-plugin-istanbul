import { createFilter } from 'rollup-pluginutils';
import istanbul from 'istanbul';

export default function (options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform (code, id) {
      if (!filter(id)) return;

      var instrumenter = new (options.instrumenter || istanbul).Instrumenter(options.instrumenterConfig || { esModules: true });

      code = instrumenter.instrumentSync(code, id);

      return {
        code,
        map: { mappings: '' }
      };
    }
  };
}
