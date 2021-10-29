# @af/example-component-public

## 0.1.8

### Patch Changes

- Updated dependencies

## 0.1.7

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.1.6

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.1.5

### Patch Changes

- [`0b653e31b7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b653e31b7) - Update for types and remove edge.

## 0.1.4

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.3

### Patch Changes

- Updated dependencies

## 0.1.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.1

### Patch Changes

- [`a16ce81938`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a16ce81938) - Update .npmignore file

## 0.1.0

### Minor Changes

- [`122cb7d07d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/122cb7d07d) - A simple reference example of a public component.
