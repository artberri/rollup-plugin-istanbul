# rollup-plugin-istanbul changelog

All notable changes to this project will be documented in this file.

## 4.0.0 (2022-11-02)

### Bug Fixes

- Fix coverage location ([#24](https://github.com/artberri/rollup-plugin-istanbul/issues/24))

### BREAKING CHANGES

- Dropped support for Node.js 10 and 12
- `istanbul-lib-instrument` version `^5.2.1` is now used

## 3.0.0 (2020-12-22)

### Bug Fixes

- Fix sourcemap support ([#21](https://github.com/artberri/rollup-plugin-istanbul/issues/21))

### BREAKING CHANGES

- Node.js 10 is now required
- The defaults for `autoWrap`, `preserveComments`, `esModules` and `produceSourceMap` are now true.
- Rollup minimum version is now 1.20.0
- `istanbul-lib-instrument` version 4.0.3 is now used

## 2.0.1 (2018-02-12)

### Bug Fixes

- Fix `jsnext:main` entry in `package.json`

## 2.0.0 (2017-12-07)

### BREAKING CHANGES

- Switch from istanbul (deprecated) to new instrumenter (istanbul-lib-instrument): https://istanbul.js.org/ (Breaking change)

### Others

- Update documentation
- Upgrade dependencies

## 1.1.0 (2016-09-24)

### Features

- Source Map support, thanks to @jellymann
- Use rollup targets to build, thanks to @eventualbuddha

### Others

- Update dependencies
- Update documentation

## 1.0.0 (2016-01-23)

- First release
