# AGENTS.md

Guidance for coding agents working on `rollup-plugin-istanbul`, a Rollup
plugin that instruments code with Istanbul for coverage reporting.

## Layout

- `src/index.js`: the whole plugin (one `transform` hook). ES module source;
  the package is `"type": "module"`. Its `// @ts-self-types` comment points
  JSR at `index.d.ts`; keep it on the first line.
- `rollup.config.mjs`: builds `src/` into `dist/rollup-plugin-istanbul.cjs`
  and `.mjs`. `dist/` is git-ignored.
- `index.d.ts` (ES module) and `index.d.cts` (CommonJS, `export =`):
  hand-written types. Keep them in step with the options in `src/index.js`
  and the README.
- `test/plugin.test.js`: tests against `src/`. `test/dist.test.js`: smoke
  tests for both built files, so it needs a fresh build. `test/helpers.js`
  bundles `test/fixtures/main.js` from inside `test/`.
- `examples/karma`, `examples/karma-ts`: standalone example projects with
  their own `package.json` and lockfile, tested in CI. They depend on the
  plugin via `file:../..` and are ignored by the linter and formatter. Keep
  them on chai 4 (karma-chai needs chai's browser build, removed in chai 5)
  and TypeScript 6 (`@rollup/plugin-typescript` needs TypeScript's JavaScript
  API, which TypeScript 7 doesn't have).
- `jsr.json`: JSR package config. Its `version` must match `package.json`.

## Commands

Node.js, pnpm and npm are pinned in `.prototools` (proto); CI installs them
with `moonrepo/setup-toolchain`. Keep `packageManager` in `package.json` in
step with the pnpm version there. `pnpm install` runs `prepare`, which builds
`dist/`.

```sh
pnpm run build   # rollup -c, clears dist/ first
pnpm test        # node --test on the two test files
pnpm run check   # oxlint --deny-warnings && oxfmt --check
pnpm run format  # oxfmt, writes fixes
```

- Run `pnpm run build` before `pnpm test` after changing `src/`, or
  `dist.test.js` checks a stale build.
- Run `pnpm run check` before finishing.
- Don't commit `pnpm-lock.yaml` changes unless dependencies changed.
- `pnpm test` lists the test files explicitly: on Node 18 and 20,
  `node --test` without arguments would also run `test/fixtures/` and
  `test/helpers.js`. Add new test files to the script.

## Compatibility constraints

- Supported: Node 18+ (`engines`) and Rollup 3 and 4 (`peerDependencies`).
  CI tests Node 18, 20, 22, 24 and 26 by setting `PROTO_NODE_VERSION`, which
  overrides `.prototools`, each with Rollup 3 and 4. Only use plugin APIs
  that exist in Rollup 3.
- Runtime code, tests and the build must work on Node 18: no
  `import.meta.dirname`, `require(esm)` or other newer APIs. oxlint and oxfmt
  need Node 20.19+, so `check` runs only on the pinned Node version in CI.
- Keep both CJS and ESM outputs, and both type files, working. To check the
  types, pack the package and type-check a small ESM and CJS consumer with
  `module: "nodenext"`.
- `@rollup/pluginutils` and `istanbul-lib-instrument` stay external in the
  build. Upgrading `istanbul-lib-instrument` to a new major has been treated
  as a breaking change (see `CHANGELOG.md`).
- Default instrumenter options live in `addDefaultOptions`; changing them
  changes behaviour for every user who doesn't override them, so call it out
  in `CHANGELOG.md`.

## Code style

Enforced by oxfmt (`.oxfmtrc.json`) and oxlint (`.oxlintrc.json`):

- Tabs, 80-column lines, double quotes, no semicolons, trailing commas.
- oxlint runs the `correctness` and `suspicious` categories plus `no-undef`
  as errors. The fixture's `whatever` global is declared in an override.

## Documentation and changelog

- User-facing changes go in `README.md` (options are documented under
  "Usage" → "Options") and in the type files.
- Add an entry to `CHANGELOG.md` under the unreleased `## X.X.X (YYYY-MM-DD)`
  heading, grouped as `Features`, `Bug Fixes`, `BREAKING CHANGES` or `Others`,
  linking the issue or PR where there is one.

## Commits and pull requests

- Commit messages use Conventional Commit prefixes: `feat:`, `fix:`,
  `chore:`, `refactor:`, with the PR number in parentheses when merged from a
  PR, for example `feat: support rollup 4 (#54)`.
- Pull requests should relate to an open issue (see
  `.github/PULL_REQUEST_TEMPLATE.md`).
- Dependabot opens monthly grouped updates for the root package, the
  examples and GitHub Actions, with a 14-day cooldown. It doesn't update
  `.prototools`.
- Releases are published by `.github/workflows/publish.yml` when a GitHub
  release is published (directly, or from a draft). It stages the version on npm with trusted publishing
  (`npm stage publish`; a maintainer approves it on npmjs.com), and `prepack`
  runs the checks, the build and the tests first. Then it publishes the
  source to JSR, which can't be undone. Bump the version in both
  `package.json` and `jsr.json`. Don't create releases or publish unless
  asked.
- CI dry-runs the JSR publish (`npx jsr@0.14.3 publish --dry-run`); locally,
  add `--allow-dirty` for uncommitted changes. It needs `node_modules`
  installed.
