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
        istanbul({
          exclude: ['spec/**/*.spec.js'],
          sourceMap: true,
          instrumenterConfig: {
            produceSourceMap: true
          },
        }),
        babel({ babelHelpers: 'bundled' }),
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
