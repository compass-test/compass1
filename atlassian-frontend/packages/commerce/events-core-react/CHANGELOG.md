# @atlassian/commerce-events-core-react

## 5.2.0

### Minor Changes

- [`28d5f51e0f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28d5f51e0f1) - Released unreleased event core package

## 5.1.0

### Minor Changes

- [`bffb397091b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bffb397091b) - Added nestListeners helper

## 5.0.0

### Major Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

## 4.0.0

### Major Changes

- [`001bcc8380`](https://bitbucket.org/atlassian/atlassian-frontend/commits/001bcc8380) - Partial removal of createTransformer

## 3.1.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

## 3.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

## 2.0.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.0.3

### Patch Changes

- [`fcdec16fb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcdec16fb3) - Separated @atlassiansox/analytics-web-client types into its own package

## 2.0.2

### Patch Changes

- [`0cb0d50267`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cb0d50267) - Renamed createTransparentListener->withRedispatch and createFilteredListener->withFilter

## 2.0.1

### Patch Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events

## 2.0.0

### Major Changes

- [`3213779572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3213779572) - createTranformer now takes a hook for the transformation callback

## 1.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.0.1

### Patch Changes

- [`e1fca2c1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1fca2c1bb) - New analytics API for Commerce packages
- [`398935396a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/398935396a) - Added new analytics API for Commerce packages
