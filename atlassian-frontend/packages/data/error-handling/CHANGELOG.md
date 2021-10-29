# @atlassian/error-handling

## 0.3.7

### Patch Changes

- [`61a78d3a9f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61a78d3a9f5) - Fixes some typechecking errors

## 0.3.6

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.3.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.3.4

### Patch Changes

- Updated dependencies

## 0.3.3

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.3.2

### Patch Changes

- Updated dependencies

## 0.3.1

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.3.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [`823a069dde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/823a069dde) - Bumped bowser dependency

## 0.1.7

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.1.6

### Patch Changes

- Updated dependencies

## 0.1.5

### Patch Changes

- [`95ca5c978b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95ca5c978b) - Adds missing check for undefined values

## 0.1.4

### Patch Changes

- [patch][f45c19a96e](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45c19a96e):

  Remove unused dependencies

## 0.1.3

### Patch Changes

- [patch][b1d3cda856](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1d3cda856):

  As part of removing flow support, removing unnecessary \$FlowFixMe in a typecript file.- Updated dependencies [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):

  - @atlaskit/analytics-next@6.3.6

## 0.1.2

### Patch Changes

- [patch][43f99c10e9](https://bitbucket.org/atlassian/atlassian-frontend/commits/43f99c10e9):

  Minor refactoring to comply with Tangerine code structure

## 0.1.1

### Patch Changes

- [patch][a2390cb719](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2390cb719):

  Introduced the error handling library into atlassian-frontend- [patch][7b86438e5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b86438e5f):

  Introduce error handling and expose AnalyticsAttributes from analytics-bridge- Updated dependencies [7b86438e5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b86438e5f):

  - @atlassian/analytics-bridge@0.1.4
