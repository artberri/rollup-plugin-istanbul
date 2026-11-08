# rollup-plugin-istanbul changelog

All notable changes to this project will be documented in this file.

## 6.0.0 (2026-11-08)

### Features

- Ship TypeScript types for both the ES module and CommonJS builds ([#66](https://github.com/artberri/rollup-plugin-istanbul/issues/66))
- Publish to [JSR](https://jsr.io/@artberri/rollup-plugin-istanbul) as `@artberri/rollup-plugin-istanbul`

### BREAKING CHANGES

- Dropped support for Rollup 1 and 2: Rollup 3 or 4 is now required

### Others

- Replace ESLint and Prettier with oxlint and oxfmt
- Replace Mocha with the Node.js test runner, and test on Node.js 18 to 26
- Publish to npm with staged trusted publishing and provenance
- Pin Node.js, pnpm and npm with proto (`.prototools`) and add Dependabot
- Update examples, and switch the TypeScript example from import assertions to
  import attributes
- Upgrade dependencies

## 5.0.0 (2023-10-21)

### Features

- Added support to Rollup v4 ([#54](https://github.com/artberri/rollup-plugin-istanbul/pull/54))

### BREAKING CHANGES

- Dropped support for Node.js 14
- `istanbul-lib-instrument` version `^6.0.1` is now used

## 4.0.0 (2022-11-02)

### Features

- Added support to Rollup v3

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
