# @atlassian/commerce-events-ui-react

## 3.0.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies

## 3.0.0

### Major Changes

- [`f83126d3b2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f83126d3b2b) - Removed old GasV3 screen API

## 2.0.0

### Major Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 0.3.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.3.1

### Patch Changes

- [`43ae90d6d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43ae90d6d0) - Atlaskit event repackager now accepts an event API

## 0.3.0

### Minor Changes

- [`333577781e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/333577781e) - The breadcrumb mounted event API now uses the breadcrumed payload shape

## 0.2.6

### Patch Changes

- [`2dae2fa7f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2dae2fa7f8) - Added first-paint metal metric for payment flow

## 0.2.5

### Patch Changes

- [`3213779572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3213779572) - createTranformer now takes a hook for the transformation callback
- Updated dependencies

## 0.2.4

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.2.3

### Patch Changes

- [`e1fca2c1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1fca2c1bb) - New analytics API for Commerce packages
- [`398935396a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/398935396a) - Added new analytics API for Commerce packages

## 0.2.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.2.1

### Patch Changes

- [`1af723caed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1af723caed) - Added mocks and tests
- [`1af723caed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1af723caed) - Added package level mocks for easier consumption in unit tests

## 0.2.0

### Minor Changes

- [`a05b04738d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a05b04738d) - Added metal instrumentation to CC component

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.0.2

### Patch Changes

- [`fec774da42`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fec774da42) - Added initial monitoring event API library for Commerce
