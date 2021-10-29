# @repo/stricter-rules

## 1.4.5

### Patch Changes

- [`7b4580d1583`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b4580d1583) - The deprecated package @atlaskit/field-radio-group has been removed from the monorepo

## 1.4.4

### Patch Changes

- [`ac2313107e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac2313107e1) - @atlaskit/global-navigation has been removed from the Atlassian Frontend monorepo.

## 1.4.3

### Patch Changes

- [`b90c0237824`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b90c0237824) - Update package.jsons to remove unused dependencies.

## 1.4.2

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.4.1

### Patch Changes

- [`0171993f15b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0171993f15b) - Delete @atlassian/forge-ui-core package.

## 1.4.0

### Minor Changes

- [`be5d1a83a8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be5d1a83a8e) - Add coverage for unpublished scopes such as af, repo and unpublished.

## 1.3.7

### Patch Changes

- [`a44cece0063`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a44cece0063) - Removed deprecated auto entry points and added new entry points in Pagination package

## 1.3.6

### Patch Changes

- [`81ece7d2541`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81ece7d2541) - Migrate to declarative entry points for section message

## 1.3.5

### Patch Changes

- [`ec96a1225b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec96a1225b3) - Remove `@atlaskit/calendar` from exclusion-list after migrating to declarative entry points
- [`4068c3183c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4068c3183c5) - Moved @atlaskit/analytics-namespaced-context entrypoints to package.json

## 1.3.4

### Patch Changes

- [`c7f978e08e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c7f978e08e5) - Remove Profilecard from the list of packages excluded from entrypoints

## 1.3.3

### Patch Changes

- [`4fd635aba0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4fd635aba0) - Adding a list of private atlaskit packages to improve the rule and prevent those packages to be added as dependencies.

## 1.3.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.3.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.3.0

### Minor Changes

- [`84510f0270`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84510f0270) - Add new Stricter rule for enforcing each published TypeScript package to have build/tsconfig.json

## 1.2.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.2.1

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 1.2.0

### Minor Changes

- [`682e4e9903`](https://bitbucket.org/atlassian/atlassian-frontend/commits/682e4e9903) - Remove usage of deprecated package.json fields and move validate-package-jsons and cache to Typescript.

### Patch Changes

- Updated dependencies

## 1.1.1

### Patch Changes

- [patch][3da1b88df5](https://bitbucket.org/atlassian/atlassian-frontend/commits/3da1b88df5):

  Ignore eslint & stricter plugins in no-unused-dependencies rule

## 1.1.0

### Minor Changes

- [minor][0ef8a7a973](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ef8a7a973):

  Update rules to work enforce restructured atlaskit metadata + releaseModel fields as described in https://hello.atlassian.net/wiki/spaces/~hobweger/pages/668331437/RFC+atlassian-frontend+package+categories+and+.jsons

## 1.0.0

### Major Changes

- [major][6df4d4c0eb](https://bitbucket.org/atlassian/atlassian-frontend/commits/6df4d4c0eb):

  Rename package to @repo/stricter-plugin-rules, convert to a plugin and TypeScript

## 0.2.0

### Minor Changes

- [minor][ff514d22f1](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff514d22f1):

  Enforce public packages not being able to depend on private packages.

## 0.1.2

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 0.1.1

### Patch Changes

- [patch][71856c1abc](https://bitbucket.org/atlassian/atlassian-frontend/commits/71856c1abc):

  Updated the internal validator for publishConfig so there is a warning if a private package has one defined.

## 0.1.0

### Minor Changes

- [minor][782e0f8e06](https://bitbucket.org/atlassian/atlassian-frontend/commits/782e0f8e06):

  Introducing Stricter to the repo, along with an initial rule for validating package.json files.
