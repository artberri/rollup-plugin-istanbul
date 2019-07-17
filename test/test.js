const assert = require('assert');
const rollup = require('rollup');
const istanbulPlugin = require('..');
const babel = require('rollup-plugin-babel');
const path = require('path');

process.chdir(__dirname);

describe('rollup-plugin-istanbul', function () {
  this.timeout(15000);

  it('transforms code through istanbul instrumenter', function () {
    return rollup
      .rollup({
        input: 'fixtures/main.js',
        plugins: [istanbulPlugin()]
      })
      .then(bundle =>
        bundle.generate({
          format: 'iife',
          name: 'test',
          globals: {
            whatever: 'whatever'
          }
        })
      )
      .then(generated => {
        const code = generated.output[0].code;
        assert.ok(code.indexOf('coverage[path]') !== -1, code);
      });
  });

  it('adds the file name properly', function () {
    return rollup
      .rollup({
        input: 'fixtures/main.js',
        plugins: [istanbulPlugin()]
      })
      .then(bundle =>
        bundle.generate({
          format: 'iife',
          name: 'test',
          globals: {
            whatever: 'whatever'
          }
        })
      )
      .then(generated => {
        const code = generated.output[0].code;
        assert.ok(/(\/|\\\\)fixtures(\/|\\\\)main\.js"/.test(code), code);
      });
  });

  it('transforms code through istanbul instrumenter with source map', function () {
    return rollup
      .rollup({
        input: 'fixtures/main.js',
        plugins: [babel(), istanbulPlugin({ compact: false })]
      })
      .then(bundle =>
        bundle.generate({
          sourcemap: true,
          format: 'iife',
          name: 'test',
          globals: {
            whatever: 'whatever'
          }
        })
      )
      .then(generated => {
        const { code, map } = generated.output[0];

        assert.deepEqual(map.sources, ['fixtures/main.js']);
        assert.deepEqual(map.sourcesContent, [
          'export const foo = bar => {\n  if (bar) {\n    whatever.do();\n  } else {\n    whatever.stop();\n  }\n};\n'
        ]);

        eval(code);

        const p = path.join(__dirname, 'fixtures' + path.sep + 'main.js');
        const global = new Function('return this')();
        const coverage = global.__coverage__[p];

        assert.ok(coverage);
        assert.equal(coverage.path, p);
        assert.deepEqual(coverage.inputSourceMap.sources, [p]);
        assert.deepEqual(coverage.inputSourceMap.sourcesContent, [
          'export const foo = bar => {\n  if (bar) {\n    whatever.do();\n  } else {\n    whatever.stop();\n  }\n};\n'
        ]);
      });
  });
});
