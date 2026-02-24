# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.0.1](https://github.com/brickhouse-tech/build-info/compare/v1.0.0...v1.0.1) (2026-02-24)

## [1.0.0](https://github.com/brickhouse-tech/build-info/compare/v0.1.1...v1.0.0) (2026-02-24)


### ⚠ BREAKING CHANGES

* Requires Node >= 18

Removed:
- esm (replaced by native ES modules via "type": "module")
- babel (all of it — @babel/cli, core, node, preset-env, runtime, plugin-transform-runtime)
- gulp + gulp-babel + gulp-eslint (no build step needed)
- bluebird (replaced by native Promise/async-await)
- lodash (replaced by native Object methods)
- macos-release (use os.platform() + os.release() directly)
- os-name (same)
- coveralls (eliminated last unfixable CVE)
- jest + jest-cli + jest-extended + jest-expect-message (replaced by vitest)
- eslint-watch + babel-eslint + eslint-config-gulp + eslint plugins
- del, sort-package-json, esm
- yarn.lock (migrated to npm)

Added:
- simple-git v3 (was v1)
- vitest (modern test runner with native ESM support)

Results:
- 0 CVEs (was 22)
- 2 dependencies (was 14 + 24 devDeps)
- 54 packages total (was 908)
- 6 tests passing
- No build step required (ship source directly)

### Features

* modernize to native ES modules, npm, zero CVEs ([64968a7](https://github.com/brickhouse-tech/build-info/commit/64968a7e096a70fbb2e08a5b73bbdcadea527c64))


### Bug Fixes

* **security:** resolve 21 of 22 CVE vulnerabilities ([7443e08](https://github.com/brickhouse-tech/build-info/commit/7443e083bffbe47cd536e8f49c05a919f3bb87ad))
