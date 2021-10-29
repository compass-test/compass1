# @af/package-ownership-cli

## 1.0.12

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.0.11

### Patch Changes

- Updated dependencies

## 1.0.10

### Patch Changes

- Updated dependencies

## 1.0.9

### Patch Changes

- Updated dependencies

## 1.0.8

### Patch Changes

- [`6ee9dc7a5d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ee9dc7a5d8) - Fix error thrown when team of one word is supplied.

## 1.0.7

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.0.6

### Patch Changes

- Updated dependencies

## 1.0.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.0.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.0.3

### Patch Changes

- Updated dependencies

## 1.0.2

### Patch Changes

- [`80b384dede`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80b384dede) - Can now search for unowned packages using `find --team=no-team`

## 1.0.1

### Patch Changes

- [`6f034f14a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f034f14a9) - Update path to package path based on the rule `@atlassian/tangerine/import/no-relative-package-imports`.

## 1.0.0

### Major Changes

- [`f938006f18`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f938006f18) - CLI tools for ownership of packages in atlassian-frontend.
