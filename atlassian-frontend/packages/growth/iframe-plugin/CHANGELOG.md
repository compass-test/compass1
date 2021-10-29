# Change Log

## 9.1.0

### Minor Changes

- [`d3827391c48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3827391c48) - Add isEmbedded/iframeIsEmbedded prop to add min-height to the iframe

## 9.0.0

### Major Changes

- [`5a522946653`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a522946653) - Add readyTimeout event to iframe-plugin

  Breaking change: pollingThresholdMilliseconds iframe-plugin constructor option is replaced with handshakeEventTimeoutDelayMilliSeconds and readyEventTimeoutDelayMilliSeconds
  Reason for change: added readyTimeout SLI bad event to monitor cross-flow-support SLOs
  How to update: Cross-flow dependencies (product-store-react and cross-flow-react) are already updated with the new parameters. Up-flow dependencies need to be manually updated to use the new parameters.

## 8.0.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 8.0.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 8.0.2

### Patch Changes

- Updated dependencies

## 8.0.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 8.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 7.8.7

### Patch Changes

- [`7643031f3c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7643031f3c) - AFPMIGRATE-63: Include "src" to fix sourcemaps for iframe-plugin

## 7.8.6

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 7.8.5

### Patch Changes

- [`85f34f3585`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85f34f3585) - Removal of @types/enzyme-adapter-react-16

## 7.8.4

### Patch Changes

- [`3d2ef44c81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d2ef44c81) - Migrated iframe-plugin to atlassian-frontend

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.8.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.8.0...@atlassiansox/iframe-plugin@7.8.1) (2020-05-05)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [7.8.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.7.3...@atlassiansox/iframe-plugin@7.8.0) (2020-05-04)

### Features

- add plugins as a prop to the CrossFlowIntegration in cross-flow-react ([3be297f](https://bitbucket.org/atlassian/growth-kit/commits/3be297f))

## [7.7.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.7.2...@atlassiansox/iframe-plugin@7.7.3) (2020-05-04)

### Bug Fixes

- **iframe-plugin:** split url into base and hash chunks ([86e515b](https://bitbucket.org/atlassian/growth-kit/commits/86e515b))

## [7.7.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.7.1...@atlassiansox/iframe-plugin@7.7.2) (2020-05-04)

### Bug Fixes

- **iframe-plugin:** add support for hashes in appendSearchparams ([538c8a8](https://bitbucket.org/atlassian/growth-kit/commits/538c8a8))

## [7.7.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.7.0...@atlassiansox/iframe-plugin@7.7.1) (2020-05-01)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [7.7.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.6.1...@atlassiansox/iframe-plugin@7.7.0) (2020-04-29)

### Bug Fixes

- refactor how plugins are defined on cross flow spa and then consumed in cross flow frontend ([ba0a95c](https://bitbucket.org/atlassian/growth-kit/commits/ba0a95c))
- update various tests and methods to cater for latest type changes and refactors ([a29eed4](https://bitbucket.org/atlassian/growth-kit/commits/a29eed4))

### Features

- add rpc client to SpaChildClient and relevant files in cross flow spa and cross flow frontend ([62b40d7](https://bitbucket.org/atlassian/growth-kit/commits/62b40d7))
- use context for passing rpcClient to cross flow spa and updated types and tests as needed ([12268a8](https://bitbucket.org/atlassian/growth-kit/commits/12268a8))

## [7.6.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.6.0...@atlassiansox/iframe-plugin@7.6.1) (2020-04-24)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [7.6.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.5.1...@atlassiansox/iframe-plugin@7.6.0) (2020-04-23)

### Features

- **iframe-plugin:** add event emitter patten to spaChildClient ([1284cfb](https://bitbucket.org/atlassian/growth-kit/commits/1284cfb))

## [7.5.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.5.0...@atlassiansox/iframe-plugin@7.5.1) (2020-04-17)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [7.5.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.4.0...@atlassiansox/iframe-plugin@7.5.0) (2020-04-15)

### Features

- actually generate a uuid for each RPC invoke call ([9800c57](https://bitbucket.org/atlassian/growth-kit/commits/9800c57))
- initial commit of new RPC functionality for the iframe plugin ([095e14b](https://bitbucket.org/atlassian/growth-kit/commits/095e14b))

# [7.4.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.3.1...@atlassiansox/iframe-plugin@7.4.0) (2020-04-09)

### Features

- **iframe-plugin:** emit handshake event to SpaParentClient when handshake received ([0fe2b2a](https://bitbucket.org/atlassian/growth-kit/commits/0fe2b2a))

## [7.3.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.3.0...@atlassiansox/iframe-plugin@7.3.1) (2020-03-26)

### Bug Fixes

- override modal/loader elements from cross-flow-react, minor fixes ([73e8c54](https://bitbucket.org/atlassian/growth-kit/commits/73e8c54))

# [7.3.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.2.0...@atlassiansox/iframe-plugin@7.3.0) (2020-02-20)

### Features

- **cross-flow-support:** abstract analytics events firing to integration level. Add error boundary ([ec115ff](https://bitbucket.org/atlassian/growth-kit/commits/ec115ff))

# [7.2.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.1.0...@atlassiansox/iframe-plugin@7.2.0) (2020-02-19)

### Features

- **iframe-plugin:** export createSpinner function. create spinner styles as part of spinner creatio ([89a82f6](https://bitbucket.org/atlassian/growth-kit/commits/89a82f6))

# [7.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.31...@atlassiansox/iframe-plugin@7.1.0) (2020-02-17)

### Features

- **iframe-plugin:** enable custom components (modal/loader) to be passed down ([194d533](https://bitbucket.org/atlassian/growth-kit/commits/194d533))

## [7.0.31](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.30...@atlassiansox/iframe-plugin@7.0.31) (2020-02-13)

### Bug Fixes

- remove unnecessary nested eslintrc config files ([bd84cce](https://bitbucket.org/atlassian/growth-kit/commits/bd84cce))

## [7.0.30](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.30) (2020-01-23)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.29](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.29) (2020-01-23)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.28](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.28) (2020-01-23)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.27](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.27) (2020-01-23)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.26](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.26) (2020-01-23)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.25](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.25) (2020-01-23)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.24](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.24) (2020-01-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.23](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.23) (2020-01-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.22](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.22) (2020-01-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.21](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.21) (2020-01-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.20](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.20) (2020-01-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.19](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.19) (2020-01-21)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.18](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.18) (2020-01-21)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.17](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.16...@atlassiansox/iframe-plugin@7.0.17) (2020-01-21)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.15](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.14...@atlassiansox/iframe-plugin@7.0.15) (2019-12-18)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.14](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.13...@atlassiansox/iframe-plugin@7.0.14) (2019-12-06)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.13](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.12...@atlassiansox/iframe-plugin@7.0.13) (2019-12-06)

### Bug Fixes

- **iframe-pplugin:** update message payload structures. Add queue system for slave ([765ff24](https://bitbucket.org/atlassian/growth-kit/commits/765ff24))

## [7.0.12](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.11...@atlassiansox/iframe-plugin@7.0.12) (2019-12-05)

### Bug Fixes

- **iframe-plugin:** fix spaChildClient from firng handshake too many times ([b16bc45](https://bitbucket.org/atlassian/growth-kit/commits/b16bc45))

## [7.0.11](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.10...@atlassiansox/iframe-plugin@7.0.11) (2019-11-04)

### Bug Fixes

- **iframe-plugin:** track ready and handshake events being emitted from child and send them to paren ([3b6d0c9](https://bitbucket.org/atlassian/growth-kit/commits/3b6d0c9))

## [7.0.10](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.9...@atlassiansox/iframe-plugin@7.0.10) (2019-10-30)

### Bug Fixes

- disable coverage from all tests ([34f4660](https://bitbucket.org/atlassian/growth-kit/commits/34f4660))

## [7.0.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.8...@atlassiansox/iframe-plugin@7.0.9) (2019-10-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.7...@atlassiansox/iframe-plugin@7.0.8) (2019-10-21)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.6...@atlassiansox/iframe-plugin@7.0.7) (2019-10-17)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.5...@atlassiansox/iframe-plugin@7.0.6) (2019-10-16)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.4...@atlassiansox/iframe-plugin@7.0.5) (2019-10-14)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.3...@atlassiansox/iframe-plugin@7.0.4) (2019-10-14)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.2...@atlassiansox/iframe-plugin@7.0.3) (2019-10-10)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.1...@atlassiansox/iframe-plugin@7.0.2) (2019-10-02)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [7.0.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@7.0.0...@atlassiansox/iframe-plugin@7.0.1) (2019-09-27)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [7.0.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@7.0.0) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- **utils:** fix type ([647ace5](https://bitbucket.org/atlassian/growth-kit/commits/647ace5))
- **utils:** linting ([0899a15](https://bitbucket.org/atlassian/growth-kit/commits/0899a15))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

### Features

- **iframe-plugin:** move instrumentation to SpaParentClient ([2183fe7](https://bitbucket.org/atlassian/growth-kit/commits/2183fe7))
- **utils:** add error boundary ([dc58bc8](https://bitbucket.org/atlassian/growth-kit/commits/dc58bc8))
- **utils:** time Handshake & Ready events ([99ede6c](https://bitbucket.org/atlassian/growth-kit/commits/99ede6c))
- replace attribute array with an object ([ab1d5b5](https://bitbucket.org/atlassian/growth-kit/commits/ab1d5b5))
- send iframe analytics events ([f9e8cff](https://bitbucket.org/atlassian/growth-kit/commits/f9e8cff))
- throw when appName is missing ([6f0419d](https://bitbucket.org/atlassian/growth-kit/commits/6f0419d))

### BREAKING CHANGES

- appName is now a required SpaParentClientOptions

# [6.0.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@6.0.0) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- **utils:** fix type ([647ace5](https://bitbucket.org/atlassian/growth-kit/commits/647ace5))
- **utils:** linting ([0899a15](https://bitbucket.org/atlassian/growth-kit/commits/0899a15))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

### Features

- **iframe-plugin:** move instrumentation to SpaParentClient ([2183fe7](https://bitbucket.org/atlassian/growth-kit/commits/2183fe7))
- **utils:** add error boundary ([dc58bc8](https://bitbucket.org/atlassian/growth-kit/commits/dc58bc8))
- **utils:** time Handshake & Ready events ([99ede6c](https://bitbucket.org/atlassian/growth-kit/commits/99ede6c))
- replace attribute array with an object ([ab1d5b5](https://bitbucket.org/atlassian/growth-kit/commits/ab1d5b5))
- send iframe analytics events ([f9e8cff](https://bitbucket.org/atlassian/growth-kit/commits/f9e8cff))
- throw when appName is missing ([6f0419d](https://bitbucket.org/atlassian/growth-kit/commits/6f0419d))

### BREAKING CHANGES

- appName is now a required SpaParentClientOptions

# [5.0.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@5.0.0) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- **utils:** fix type ([647ace5](https://bitbucket.org/atlassian/growth-kit/commits/647ace5))
- **utils:** linting ([0899a15](https://bitbucket.org/atlassian/growth-kit/commits/0899a15))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

### Features

- **iframe-plugin:** move instrumentation to SpaParentClient ([2183fe7](https://bitbucket.org/atlassian/growth-kit/commits/2183fe7))
- **utils:** add error boundary ([dc58bc8](https://bitbucket.org/atlassian/growth-kit/commits/dc58bc8))
- **utils:** time Handshake & Ready events ([99ede6c](https://bitbucket.org/atlassian/growth-kit/commits/99ede6c))
- replace attribute array with an object ([ab1d5b5](https://bitbucket.org/atlassian/growth-kit/commits/ab1d5b5))
- send iframe analytics events ([f9e8cff](https://bitbucket.org/atlassian/growth-kit/commits/f9e8cff))
- throw when appName is missing ([6f0419d](https://bitbucket.org/atlassian/growth-kit/commits/6f0419d))

### BREAKING CHANGES

- appName is now a required SpaParentClientOptions

# [4.0.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@4.0.0) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- **utils:** fix type ([647ace5](https://bitbucket.org/atlassian/growth-kit/commits/647ace5))
- **utils:** linting ([0899a15](https://bitbucket.org/atlassian/growth-kit/commits/0899a15))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

### Features

- **iframe-plugin:** move instrumentation to SpaParentClient ([2183fe7](https://bitbucket.org/atlassian/growth-kit/commits/2183fe7))
- **utils:** add error boundary ([dc58bc8](https://bitbucket.org/atlassian/growth-kit/commits/dc58bc8))
- **utils:** time Handshake & Ready events ([99ede6c](https://bitbucket.org/atlassian/growth-kit/commits/99ede6c))
- replace attribute array with an object ([ab1d5b5](https://bitbucket.org/atlassian/growth-kit/commits/ab1d5b5))
- send iframe analytics events ([f9e8cff](https://bitbucket.org/atlassian/growth-kit/commits/f9e8cff))
- throw when appName is missing ([6f0419d](https://bitbucket.org/atlassian/growth-kit/commits/6f0419d))

### BREAKING CHANGES

- appName is now a required SpaParentClientOptions

## [3.2.38](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.38) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.37](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.37) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.36](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.36) (2019-09-26)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.35](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.35) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.34](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.34) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.33](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.33) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.32](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.32) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.31](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.31) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.30](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.30) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.29](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.29) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.28](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.28) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.27](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.27) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.26](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.26) (2019-09-25)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.25](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.25) (2019-09-24)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.24](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.24) (2019-09-24)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.23](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.23) (2019-09-23)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.22](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.22) (2019-09-23)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.21](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.21) (2019-09-23)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))
- dummy commit ([98ea1e8](https://bitbucket.org/atlassian/growth-kit/commits/98ea1e8))
- fix bamboo by manually updating plugin version number ([b940c2e](https://bitbucket.org/atlassian/growth-kit/commits/b940c2e))
- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))

## [3.2.18](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.18) (2019-09-19)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.17](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.17) (2019-09-19)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.16](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.16) (2019-09-19)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.15](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.15) (2019-09-19)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.14](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.14) (2019-09-18)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.13](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.13) (2019-09-18)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.12](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.12) (2019-09-18)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.11](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.11) (2019-09-18)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.10](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.10) (2019-09-18)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.9) (2019-09-17)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.8) (2019-09-17)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.7) (2019-09-17)

### Bug Fixes

- **iframe-plugin:** add length for insert rule in second argument. Fix animation for IE11. ([ecf0d1d](https://bitbucket.org/atlassian/growth-kit/commits/ecf0d1d))

## [3.2.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.6) (2019-09-17)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [3.2.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.5) (2019-09-17)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [3.2.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.4) (2019-09-16)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [3.2.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.3) (2019-09-16)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [3.2.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.1...@atlassiansox/iframe-plugin@3.2.2) (2019-09-16)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [3.2.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.2.0...@atlassiansox/iframe-plugin@3.2.1) (2019-09-09)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [3.2.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.0.2...@atlassiansox/iframe-plugin@3.2.0) (2019-09-06)

### Features

- **iframe-plugin:** add zindex option for modals ([2fff2b0](https://bitbucket.org/atlassian/growth-kit/commits/2fff2b0))

# [3.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.0.2...@atlassiansox/iframe-plugin@3.1.0) (2019-09-06)

### Features

- **iframe-plugin:** add zindex option for modals ([2fff2b0](https://bitbucket.org/atlassian/growth-kit/commits/2fff2b0))

## [3.0.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.0.1...@atlassiansox/iframe-plugin@3.0.2) (2019-09-05)

### Bug Fixes

- **iframe-plugin:** fix the Source in the messages and ignores messages which did not come from parent ([19d90a0](https://bitbucket.org/atlassian/growth-kit/commits/19d90a0))

## [3.0.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@3.0.0...@atlassiansox/iframe-plugin@3.0.1) (2019-09-04)

### Bug Fixes

- **iframe-plugin:** update to point consumers to dist/index.d.ts for type definitions, while local w ([7b5e4f1](https://bitbucket.org/atlassian/growth-kit/commits/7b5e4f1))

# [3.0.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@2.1.1...@atlassiansox/iframe-plugin@3.0.0) (2019-09-04)

### Features

- **iframe-plugin:** add analytics helpers for transforming raw UI analytics events into GASV3 paylo ([9f9b777](https://bitbucket.org/atlassian/growth-kit/commits/9f9b777))

### BREAKING CHANGES

- **iframe-plugin:** Event listener for \`.on(HostEvents.Analytics)\` will now return an object instead of a list e.g.
  {context: ..., payload: ...} instead of [context, payload]

## [2.1.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@2.1.0...@atlassiansox/iframe-plugin@2.1.1) (2019-09-03)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [2.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@2.0.2...@atlassiansox/iframe-plugin@2.1.0) (2019-08-30)

### Features

- **iframe-plugin:** add zindex option for iframe directly ([6a4ac72](https://bitbucket.org/atlassian/growth-kit/commits/6a4ac72))

## [2.0.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@2.0.1...@atlassiansox/iframe-plugin@2.0.2) (2019-08-27)

### Bug Fixes

- **iframe-plugin:** fixing wrong payload sent to spa client ([6e3d155](https://bitbucket.org/atlassian/growth-kit/commits/6e3d155))

## [2.0.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@2.0.0...@atlassiansox/iframe-plugin@2.0.1) (2019-08-26)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [2.0.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.1.2...@atlassiansox/iframe-plugin@2.0.0) (2019-08-26)

### Bug Fixes

- **iframe-plugin:** address PR feedback, fix tests ([e3523ee](https://bitbucket.org/atlassian/growth-kit/commits/e3523ee))
- **iframe-plugin:** compatibility fixes in iframe-plugin consumers codebases ([c43a947](https://bitbucket.org/atlassian/growth-kit/commits/c43a947))
- **up-flow-spa:** make eslint happy ([03b48c7](https://bitbucket.org/atlassian/growth-kit/commits/03b48c7))

### Features

- **iframe-plugin:** change event subscription implementation ([be531a8](https://bitbucket.org/atlassian/growth-kit/commits/be531a8))

### BREAKING CHANGES

- **iframe-plugin:** Event subscription is done via .on() method now, removed .onMessageRecieved()

## [1.1.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.1.1...@atlassiansox/iframe-plugin@1.1.2) (2019-08-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [1.1.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.1.0...@atlassiansox/iframe-plugin@1.1.1) (2019-08-22)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

# [1.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.0.6...@atlassiansox/iframe-plugin@1.1.0) (2019-08-19)

### Bug Fixes

- **iframe-plugin:** Change pollingThreshold to pollingThresholdMilliSeconds ([900c2a1](https://bitbucket.org/atlassian/growth-kit/commits/900c2a1))

### Features

- **up-flow:** add modal inside up-flow component ([fcf155c](https://bitbucket.org/atlassian/growth-kit/commits/fcf155c))

### Reverts

- **iframe-plugin:** revert iframe plugin chages ([30f5d16](https://bitbucket.org/atlassian/growth-kit/commits/30f5d16))

## [1.0.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.0.5...@atlassiansox/iframe-plugin@1.0.6) (2019-08-15)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [1.0.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.0.4...@atlassiansox/iframe-plugin@1.0.5) (2019-08-14)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [1.0.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.0.3...@atlassiansox/iframe-plugin@1.0.4) (2019-08-13)

**Note:** Version bump only for package @atlassiansox/iframe-plugin

## [1.0.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/iframe-plugin@1.0.2...@atlassiansox/iframe-plugin@1.0.3) (2019-08-13)

**Note:** Version bump only for package @atlassiansox/iframe-plugin
