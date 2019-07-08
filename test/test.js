const assert = require('assert');
const rollup = require('rollup');
const istanbulPlugin = require('..');

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
        plugins: [istanbulPlugin()]
      })
      .then(bundle =>
        bundle.generate({
          sourcemap: true,
          format: 'iife',
          globals: {
            whatever: 'whatever'
          }
        })
      )
      .then(generated => {
        const { code, map } = generated.output[0];
  
        assert.ok(code.indexOf('coverage[path]') !== -1, code);
        assert.ok(/(\/|\\\\)fixtures(\/|\\\\)main\.js"/.test(code), code);
  
        assert.ok(map.sources[0] === 'fixtures/main.js', code);
        assert.ok(
          map.sourcesContent[0] ===
            'function foo(bar) {\n    if (bar) {\n        whatever.do();\n    } else {\n        whatever.stop();\n    }\n}\n',
          map
        );
      });
  });
});
