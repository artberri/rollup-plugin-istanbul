const istanbul = require('rollup-plugin-istanbul');
const babel = require('@rollup/plugin-babel').babel;

module.exports = (config) => {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'spec/**/*.spec.js', watched: false }
    ],
    preprocessors: {
      'spec/**/*.spec.js': ['rollup']
    },
    reporters: ['mocha', 'coverage'],

    browsers: ['jsdom'],

    rollupPreprocessor: {
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
          exclude: ['spec/**/*.spec.js'],
          sourceMap: true,
          instrumenterConfig: {
            produceSourceMap: true
          },
        }),
      ],
      output: {
        format: 'iife',
        sourcemap: 'inline'
      }
    },

    coverageReporter: {
      dir: 'coverage',
      includeAllSources: true,
      reporters: [
        {'type': 'text'},
        {'type': 'html', subdir: 'html'},
        {'type': 'lcov', subdir: './'}
      ]
    },
  });
};
