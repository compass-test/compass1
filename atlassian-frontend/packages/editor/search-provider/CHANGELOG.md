# @atlassian/search-provider

## 2.1.15

### Patch Changes

- Updated dependencies

## 2.1.14

### Patch Changes

- Updated dependencies

## 2.1.13

### Patch Changes

- Updated dependencies

## 2.1.12

### Patch Changes

- Updated dependencies

## 2.1.11

### Patch Changes

- Updated dependencies

## 2.1.10

### Patch Changes

- Updated dependencies

## 2.1.9

### Patch Changes

- Updated dependencies

## 2.1.8

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.1.7

### Patch Changes

- Updated dependencies

## 2.1.6

### Patch Changes

- Updated dependencies

## 2.1.5

### Patch Changes

- Updated dependencies

## 2.1.4

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.1.3

### Patch Changes

- Updated dependencies

## 2.1.2

### Patch Changes

- Updated dependencies

## 2.1.1

### Patch Changes

- [`3d43671a2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d43671a2b) - Bump deps to fix security vulnerability

## 2.1.0

### Minor Changes

- [`44d287b640`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44d287b640) - EDM-842: Adding support to the new search provider and activity provider

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.0

### Major Changes

- [`db19eeb8c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db19eeb8c5) - - rename some of the properties for ActivityItem
  - a new SearchProvider for quick link search

### Minor Changes

- [`0cddad271a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cddad271a) - Move SearchProvider types to editor-common

### Patch Changes

- Updated dependencies
