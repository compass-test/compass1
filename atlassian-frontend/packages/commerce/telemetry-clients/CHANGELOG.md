# @atlassian/commerce-telemetry-clients

## 2.0.0

### Major Changes

- [`792ac7521e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/792ac7521e4) - Sentry utilities are now exported via a separate entrypoint.

## 1.2.1

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [`02a569a8e44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02a569a8e44) - create browser analytics on first use rather than on import

## 1.1.4

### Patch Changes

- [`08af4eb0d17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08af4eb0d17) - Upgrade @atlassiansox/analytics-web-client dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

## 1.1.3

### Patch Changes

- [`00517855b44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00517855b44) - NOOP, added a TODO comment to split package up

## 1.1.2

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")

## 1.1.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies

## 1.1.0

### Minor Changes

- [`c4d143e1ae6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c4d143e1ae6) - Added Severity Sentry type

## 1.0.1

### Patch Changes

- [`4a69d128e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a69d128e4) - Update analytics-web-client dependency to version 1.14.0

## 1.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

## 0.3.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.3.0

### Minor Changes

- [`2431d49619`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2431d49619) - Now calculating the environment in internal monitoring client for Commerce

## 0.2.3

### Patch Changes

- [`fcdec16fb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcdec16fb3) - Separated @atlassiansox/analytics-web-client types into its own package

## 0.2.2

### Patch Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events

## 0.2.1

### Patch Changes

- [`cf5529ef76`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf5529ef76) - Internal Sentry now points to commerce-libraries instead of BAC

## 0.2.0

### Minor Changes

- [`4507f2c84d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4507f2c84d) - Added Sentry and GasV3 clients

## 0.1.4

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.3

### Patch Changes

- [`8004795d40`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8004795d40) - Updated Metal client

## 0.1.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.1

### Patch Changes

- [`1af723caed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1af723caed) - Added mocks and tests
- [`1af723caed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1af723caed) - Added package level mocks for easier consumption in unit tests

## 0.1.0

### Minor Changes

- [`a05b04738d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a05b04738d) - Added metal instrumentation to CC component
