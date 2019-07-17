import { createFilter } from 'rollup-pluginutils';
import istanbul from 'istanbul-lib-instrument';
import { extname } from 'path';

function makeFilter (opts, extensions) {
  const filter = createFilter(opts.include, opts.exclude);

  extensions = opts.extensions || extensions;
  if (!extensions || extensions === '*') {
    return filter;
  }

  if (!Array.isArray(extensions)) {
    extensions = [extensions];
  }
  extensions = extensions.map(e => (e[0] !== '.' ? `.${e}` : e));

  return id => filter(id) && extensions.indexOf(extname(id)) > -1;
}

export default function (options = {}) {
  const filter = makeFilter(options, ['js', 'jsx', 'ts', 'tsx']),
    opts = Object.assign(
      { esModules: true, compact: options.compact !== false },
      options.instrumenterConfig,
      { produceSourceMap: options.sourceMap !== false }
    ),
    instrumenter = new (options.instrumenter || istanbul).createInstrumenter(opts);

  return {
    name: 'istanbul',
    transform (code, id) {
      if (!filter(id)) return;

      // getCombinedSourceMap: https://github.com/rollup/rollup/issues/2983
      const { version, sources, sourcesContent, names, mappings } = this.getCombinedSourcemap();
      code = instrumenter.instrumentSync(code, id, { version, sources, sourcesContent, names, mappings });

      return { code, map: instrumenter.lastSourceMap() };
    }
  };
}
