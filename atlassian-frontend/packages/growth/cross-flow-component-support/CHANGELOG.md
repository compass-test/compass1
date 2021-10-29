# Change Log

## 1.0.3

### Patch Changes

- [`9145dfd3d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9145dfd3d33) - Update flow types to include Team Central in Targets
- Updated dependencies

## 1.0.2

### Patch Changes

- [`6687a7a3f7f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6687a7a3f7f) - Add TEAM_CENTRAL ('townsquare') to the Targets enum
- Updated dependencies

## 1.0.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.0.0

### Major Changes

- [`a4531de37a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4531de37a) - Update exports in cross-flow integration packages

## 0.1.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.1

### Patch Changes

- [`adcd4e4a36`](https://bitbucket.org/atlassian/atlassian-frontend/commits/adcd4e4a36) - Move cross-flow-api-internals from peer to regular dependency

## 0.1.0

### Minor Changes

- [`2616a2ac68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2616a2ac68) - Introduce cross flow support for components integration
