# @atlassian/techstack-runtime

## 0.9.10

### Patch Changes

- [`4444a6428b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4444a6428b2) - allow manual configuration for current working directory

## 0.9.9

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.9.8

### Patch Changes

- [`dd1f496fd3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd1f496fd3b) - When running a rule that is type aware tech stacks now ignores JS files as they don't work with it.
- [`2088ddb0614`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2088ddb0614) - Removes unused runtime code that looks for typeAwareRules for performance reasons

## 0.9.7

### Patch Changes

- [`aad52e77d20`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aad52e77d20) - Removes unused runtime code that looks for typeAwareRules for performance reasons

## 0.9.6

### Patch Changes

- [`5e024759e89`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e024759e89) - Adds `typeAwareRule` config to eslint checks that require type information.

## 0.9.5

### Patch Changes

- [`84270dcf31a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84270dcf31a) - Bump dependency "meow" to version ^6.0.0

## 0.9.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.9.3

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.9.2

### Patch Changes

- [`cd22a004a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd22a004a7) - Show rule which conflicts during resolving and throw error when resolver plugin is undefined

## 0.9.1

### Patch Changes

- [`960078c43f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/960078c43f) - Minor spelling correction for getTechstackConfig function

## 0.9.0

### Minor Changes

- [minor][132d01bf54](https://bitbucket.org/atlassian/atlassian-frontend/commits/132d01bf54):

  Change resolver resolution; apply resolution to base config

## 0.8.2

### Patch Changes

- [patch][7df0b55307](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df0b55307):

  Change imports to comply with Atlassian conventions

## 0.8.1

### Patch Changes

- [patch][bccbef00f9](https://bitbucket.org/atlassian/atlassian-frontend/commits/bccbef00f9):

  Allow techstack:off capability to packages to opt out of techstack

## 0.8.0

### Minor Changes

- [minor][d4b31b7614](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4b31b7614):

  Allow use-cases to have solution as string rather than an array when there is one solution. Allow use-cases to be turned off using "off" flag

## 0.7.2

### Patch Changes

- [patch][03add6d4b5](https://bitbucket.org/atlassian/atlassian-frontend/commits/03add6d4b5):

  # What have been fixed?

  - `inquirer` version `3.3.0` . It has been fixed by bumping it to `6.4.0`. [Changelog](https://github.com/SBoudrias/Inquirer.js/compare/v3.3.0...v6.0.0) Mostly improvement and Node support.
  - `svgexport` version `0.3.2`. I has been fixed by bumping to `0.4.0`. There is no changelog but this is the change before the bump to [0.4.0](https://github.com/shakiba/svgexport/commit/3acbf51f0687f54d1972265cd3aef4c6a7e925fc), it should not affect anything.

## 0.7.1

### Patch Changes

- [patch][c9cc4346d6](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9cc4346d6):

  Split `lodash` using the exact import required.

## 0.7.0

### Minor Changes

- [minor][7f72b9f22b](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f72b9f22b):

  performance improvements for techstack runtime

## 0.6.0

### Minor Changes

- [minor][7f473d8dea](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f473d8dea):

  Use one override per package and allow eslint config resolver for multiple solution with same rule

## 0.5.1

### Patch Changes

- [patch][25080c5a94](https://bitbucket.org/atlassian/atlassian-frontend/commits/25080c5a94):

  Fix eslint config path when eslintrc is not in root

## 0.5.0

### Minor Changes

- [minor][a26758f82b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a26758f82b):

  +Add CLI capability to techstack runtime

## 0.4.2

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 0.4.1

### Patch Changes

- [patch][e5568c46a6](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5568c46a6):

  Allow to exclude packages from runtime

## 0.4.0

### Minor Changes

- [minor][8c99b08481](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c99b08481):

  add techstack report generation to runtime

## 0.3.2

### Patch Changes

- [patch][d754bd5600](https://bitbucket.org/atlassian/atlassian-frontend/commits/d754bd5600):

  Add team information to package

## 0.3.1

### Patch Changes

- [patch][46f4382d9f](https://bitbucket.org/atlassian/atlassian-frontend/commits/46f4382d9f):

  Fix blocking bug

## 0.3.0

### Minor Changes

- [minor][6343b957af](https://bitbucket.org/atlassian/atlassian-frontend/commits/6343b957af):

  Change API and techstack definition resolution technique

## 0.2.1

### Patch Changes

- [patch][928d7c0b9d](https://bitbucket.org/atlassian/atlassian-frontend/commits/928d7c0b9d):

  Use cache for glob fetch and fs read

## 0.2.0

### Minor Changes

- [minor][31fba4ceac](https://bitbucket.org/atlassian/atlassian-frontend/commits/31fba4ceac):

  Remove unused dependency

## 0.1.7

### Patch Changes

- Updated dependencies [acc2b8e334](https://bitbucket.org/atlassian/atlassian-frontend/commits/acc2b8e334):
  - @atlassian/eslint-plugin-tangerine@0.2.0

## 0.1.6

### Patch Changes

- [patch][06a0147f9c](https://bitbucket.org/atlassian/atlassian-frontend/commits/06a0147f9c):

  Add publishing info to package.json- Updated dependencies [06a0147f9c](https://bitbucket.org/atlassian/atlassian-frontend/commits/06a0147f9c):

  - @atlassian/eslint-plugin-tangerine@0.1.2
  - @atlassian/stricter-plugin-tangerine@0.1.2

## 0.1.5

### Patch Changes

- [patch][9f4890ef3d](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f4890ef3d):

  Move from github repository- Updated dependencies [9f4890ef3d](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f4890ef3d):

  - @atlassian/eslint-plugin-tangerine@0.1.1
  - @atlassian/stricter-plugin-tangerine@0.1.1
