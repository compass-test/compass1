# @atlassian/dragonfruit-analytics

## 2.2.7

### Patch Changes

- [`4fda567781c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4fda567781c) - Added BM3 metrics to few page loads

## 2.2.6

### Patch Changes

- [`80a389959de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80a389959de) - Fix the build tsconfig.json to properly exclude tests and examples to be built when running yarn build --types.

## 2.2.5

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 2.2.4

### Patch Changes

- Updated dependencies

## 2.2.3

### Patch Changes

- [`16e8c12f811`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16e8c12f811) - Added fireErrorAnalytics for compass mutation errors

## 2.2.2

### Patch Changes

- [`49d40f272d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/49d40f272d8) - Make tsconfig files consistent

## 2.2.1

### Patch Changes

- [`08af4eb0d17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08af4eb0d17) - Upgrade @atlassiansox/analytics-web-client dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

## 2.2.0

### Minor Changes

- [`ddbd901ad00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ddbd901ad00) - Added improved error boundaries

### Patch Changes

- Updated dependencies

## 2.1.5

### Patch Changes

- [`08f08e6f354`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08f08e6f354) - Update packages ownership, and teams members.

## 2.1.4

### Patch Changes

- [`4a69d128e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a69d128e4) - Update analytics-web-client dependency to version 1.14.0

## 2.1.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.1.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.1.1

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [`652c3a1ba1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/652c3a1ba1) - Added error analytics to service list

## 2.0.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.1

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`ea900b64e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea900b64e7) - Adding anaylitics for dragonfruit
