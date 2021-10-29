# @atlaskit/jest-config

## 1.0.21

### Patch Changes

- Updated dependencies

## 1.0.20

### Patch Changes

- [`2c8d07cd3ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c8d07cd3ba) - ## Bugfix

  The command `yarn test:vr:debug` regressed.

  - When running VR tests with the `--debug` flag, chrome starts up `testing.local.com` rather than `localhost`.
  - When running the command, it runs all tests.

  The first issue was caused by a stale reference to the `DEBUG` variable in jest config after it was renamed to `VR_DEBUG`.

  The second issue was caused by the ordering of the arguments in the command.

## 1.0.19

### Patch Changes

- [`af9c0676b1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af9c0676b1f) - AFP-2559 Set `jestConfig.prettierPath` to fix & restore ability to use `toMatchInlineSnapshot` in tests.

## 1.0.18

### Patch Changes

- [`f055d388f73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f055d388f73) - Adapting to path adjustments from a dependency change from webdriver-runner.
- Updated dependencies

## 1.0.17

### Patch Changes

- Updated dependencies

## 1.0.16

### Patch Changes

- [`805542eb2c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/805542eb2c1) - bump jest-image-snapshot

## 1.0.15

### Patch Changes

- Updated dependencies

## 1.0.14

### Patch Changes

- Updated dependencies

## 1.0.13

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.0.12

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.0.11

### Patch Changes

- [`b738f8fee3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b738f8fee3) - ED-9719 Add tooling for global Date mock

## 1.0.10

### Patch Changes

- [`05f55e7073`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05f55e7073) - Remove analytics-reporting and move from gasV2 to gasV3

## 1.0.9

### Patch Changes

- Updated dependencies

## 1.0.8

### Patch Changes

- [`5dfef289b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dfef289b5) - Upgrade Jest 25 and its related packages from 25.1 to 25.5 range

## 1.0.7

### Patch Changes

- [`d3a63274e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3a63274e7) - Upgrade JSDom from 16.2.0 to 16.2.0.

  Contains various fixes for various DOM APIs we use within our unit tests.
  See [changelog](https://github.com/jsdom/jsdom/releases/tag/16.2.2) for more info.

## 1.0.6

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 1.0.5

### Patch Changes

- [patch][185ea3e8ac](https://bitbucket.org/atlassian/atlassian-frontend/commits/185ea3e8ac):

  Upgrade JSDom from 15.1.1 to 16.2.0. This contains memory leak fixes and newer modern APIs.

## 1.0.4

### Patch Changes

- [patch][9996f1293a](https://bitbucket.org/atlassian/atlassian-frontend/commits/9996f1293a):

  BUILDTOOLS-369 Upgrade from Jest 24 to 25

## 1.0.3

### Patch Changes

- [patch][57ecf803d2](https://bitbucket.org/atlassian/atlassian-frontend/commits/57ecf803d2):

  BUILDTOOLS-369 Upgrade JSDom from 14 to 15.1.1 as a precursor to upgrading from Jest 24 to 25.

## 1.0.2

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 1.0.1

- [patch][44d9c5b" d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44d9c5b"
  d):

  - ED-5632: mock Selection API globally; allows dispatching before Editor finishes mounting
