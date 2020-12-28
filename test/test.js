const assert = require('assert');
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel').babel;
const istanbul = require('..');

process.chdir(__dirname);

describe('rollup-plugin-istanbul', function () {
  this.timeout(15000);

  it('transforms code through istanbul instrumenter', function () {
    return rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [istanbul()],
    }).then(bundle => {
      return bundle.generate({
        format: 'iife',
        name: 'test',
        globals: {
          whatever: 'whatever'
        },
      });
    }).then(generated => {
      const code = generated.output[0].code;
      assert.ok(code.indexOf('coverage[path]') !== -1, code);
    });
  });

  it('adds the file name properly', function () {
    return rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [ istanbul() ],
    }).then(bundle => {
      return bundle.generate({
        format: 'iife',
        name: 'test',
        globals: {
          whatever: 'whatever'
        },
      });
    }).then(generated => {
      const code = generated.output[0].code;
      assert.ok(code.indexOf('fixtures/main.js') !== -1, code);
    });
  });

  it('transforms code through istanbul instrumenter with source map', function () {
    return rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [
        babel({
          babelHelpers: 'bundled',
          presets: [
            [
              '@babel/preset-env',
              {
                loose: true,
                modules: false
              }
            ]
          ]
        }),
        istanbul({
          instrumenterConfig: {
            produceSourceMap: true,
            compact: false,
          }
        }),
      ],
    }).then(bundle => {
      return bundle.generate({
        sourcemap: true,
        format: 'iife',
        name: 'test',
        globals: {
          whatever: 'whatever'
        },
      });
    }).then(generated => {
      const { map } = generated.output[0];

      assert.deepStrictEqual(map.sources, ['fixtures/main.js']);
      assert.deepStrictEqual(map.sourcesContent, [
        'export const foo = bar => {\n' +
        '  if (bar) {\n' +
        '    whatever.do();\n' +
        '  } else {\n' +
        '    whatever.stop();\n' +
        '  }\n' +
        '};\n'
      ]);
      assert.notStrictEqual(map.mappings, '');
    });
  });
});
