# rollup-plugin-istanbul

[![Build Status](https://travis-ci.org/artberri/rollup-plugin-istanbul.svg?branch=master)](https://travis-ci.org/artberri/rollup-plugin-istanbul)
[![Maintainability](https://api.codeclimate.com/v1/badges/ea3da2334fcbff2a07c8/maintainability)](https://codeclimate.com/github/artberri/rollup-plugin-istanbul/maintainability)
[![Last version](https://img.shields.io/npm/v/rollup-plugin-istanbul.svg)](https://www.npmjs.com/package/rollup-plugin-istanbul)
[![Total Downloads](https://img.shields.io/npm/dt/rollup-plugin-istanbul.svg)](https://www.npmjs.com/package/rollup-plugin-istanbul)
[![Downloads Last Month](https://img.shields.io/npm/dm/rollup-plugin-istanbul.svg)](https://www.npmjs.com/package/rollup-plugin-istanbul)
[![Dependencies Status](https://david-dm.org/artberri/rollup-plugin-istanbul.svg)](https://david-dm.org/artberri/rollup-plugin-istanbul)
[![License](https://img.shields.io/npm/l/rollup-plugin-istanbul.svg)](https://github.com/artberri/rollup-plugin-istanbul/blob/master/LICENSE)

Seamless integration between [Rollup](https://github.com/rollup/rollup) and [Istanbul](https://github.com/istanbuljs/istanbuljs).

## Why?

If you're using Rollup to generate a standalone bundle you will probably need also to bundle your tests before running them, and if you want the code coverage report, you will need to instrument the program files before the bundle is generated to avoid instrumenting also the code of the test files.

That is the reason why rollup-plugin-istanbul exists.

## Installation

```bash
npm install --save-dev rollup-plugin-istanbul
```

## Usage

```js
import { rollup } from 'rollup';
import istanbul from 'rollup-plugin-istanbul';

rollup({
  entry: 'main.js',
  plugins: [
    istanbul({
      exclude: ['test/**/*.js']
    })
  ]
}).then(...)
```

### Options

All options are optional.

#### `include`

Can be a minimatch pattern or an array of minimatch patterns. If is omitted or of zero length, files should be included by default; otherwise they should only be included if the ID matches one of the patterns.

#### `exclude`

Can be a minimatch pattern or an array of minimatch patterns. Files to exclude, commonly the test files.

#### `instrumenterConfig`

An object of options that will be passed to the instrumenter.

Default value:

```js
{
  esModules: true,
  compact: true,
  produceSourceMap: true,
  autoWrap: true,
  preserveComments: true
}
```

[More info](https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-lib-instrument/api.md#parameters-1) about options.

#### `instrumenter`

Can be a replacement for the istanbul library, for example [isparta](https://github.com/douglasduteil/isparta). It should implement the same API as istanbul.

### Other usage options

`rollup-plugin-istanbul` can be used with karma or other test runners that allow preprocessors. Here you can see how to implement it with Karma with the help of the [karma-rollup-preprocessor](https://github.com/jlmakes/karma-rollup-preprocessor) and [karma-coverage](https://github.com/karma-runner/karma-coverage):

```js
// karma.conf.js
var istanbul = require('rollup-plugin-istanbul');

module.exports = function (config) {
  config.set({
    files: [
      'test/*.js'
    ],
    preprocessors: {
      'test/*.js': ['rollup']
    },
    rollupPreprocessor: {
      rollup: {
        plugins: [
          istanbul({
            exclude: ['test/*.js']
          })
        ]
      }
    },
    reporters: ['coverage']
  });
};
```

Going further, this is how you can implement it when you are using babel because you are writing ES2015 code:

```js
// karma.conf.js

const istanbul = require('rollup-plugin-istanbul');
const babel = require('@rollup/plugin-babel').babel;

module.exports = function (config) {
  config.set({
    files: [
      'test/*.js'
    ],
    preprocessors: {
      'test/*.js': ['rollup']
    },
    rollupPreprocessor: {
        plugins: [
            istanbul({
                exclude: ['test/*.js']
            }),
            babel({ babelHelpers: 'bundled' }),
        ],
        output: {
            format: 'iife',
            sourceMap: 'inline'
        }
    },
    reporters: ['coverage'],
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
```

Example of implementation provided in [examples folder](examples/karma).

## License

[http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-2020 Alberto Varela Sánchez & [Contributors](https://github.com/artberri/rollup-plugin-istanbul/graphs/contributors)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
