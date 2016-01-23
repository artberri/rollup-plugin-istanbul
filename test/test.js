var assert = require('assert');
var rollup = require('rollup');
var istanbulPlugin = require( '..' );

process.chdir( __dirname );

describe('rollup-plugin-istanbul', function () {
  this.timeout(15000);

  it('transforms code through istanbul instrumenter', function () {
    return rollup.rollup({
      entry: 'fixtures/main.js',
      plugins: [ istanbulPlugin() ],
      external: ['whatever']
    }).then( function ( bundle ) {
      var generated = bundle.generate();

      var code = generated.code;

      assert.ok(code.indexOf('__cov_') !== -1, code);
    });
  });

  it('adds the file name properly', function () {
    return rollup.rollup({
      entry: 'fixtures/main.js',
      plugins: [ istanbulPlugin() ],
      external: ['whatever']
    }).then( function ( bundle ) {
      var generated = bundle.generate();

      var code = generated.code;

      assert.ok(code.indexOf('fixtures/main.js') !== -1, code);
    });
  });
});
