# @atlassian/eslint-plugin-tangerine

## 0.7.6

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.7.5

### Patch Changes

- Updated dependencies

## 0.7.4

### Patch Changes

- [`6552bc140b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6552bc140b1) - Bump simple-spellchecker to 1.0.2 to include patch for adm-zip

## 0.7.3

### Patch Changes

- [`d04bf469abe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d04bf469abe) - Update error message for import/entry-points

## 0.7.2

### Patch Changes

- [`98d02017cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98d02017cc) - import/entry-points now correctly resolves packages that live in the repo

## 0.7.1

### Patch Changes

- [`d226bdc829`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d226bdc829) - [import/entry-points] - Allow importing from the default entry point when an empty `af:exports` field is declared

## 0.7.0

### Minor Changes

- [`8c24024912`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c24024912) - Updated to support af:exports package.json field in addition to exports

## 0.6.5

### Patch Changes

- [`32d6d8f152`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32d6d8f152) - Replace node.start with node.range[0] to appease compiler

## 0.6.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.6.3

### Patch Changes

- [patch][ed2a4af0fc](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed2a4af0fc):

  Bump eslint-plugin-import dependency

## 0.6.2

### Patch Changes

- [patch][7df0b55307](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df0b55307):

  Change imports to comply with Atlassian conventions- Updated dependencies [7df0b55307](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df0b55307):

  - @atlassian/eslint-utils@0.1.3

## 0.6.1

### Patch Changes

- [patch][0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):

  Introduce repository-internal techstack and Eslint plugin; extract utils- Updated dependencies [0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):

  - @atlassian/eslint-utils@0.1.0

## 0.6.0

### Minor Changes

- [minor][ec666e5e66](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec666e5e66):

  Introduce export/no-export-all rule

## 0.5.1

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 0.5.0

### Minor Changes

- [minor][cfbca87ae8](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfbca87ae8):

  Removed import/order and import/no-default-export. Please use eslint-plugin-import/order and eslint-plugin-import/no-default-export instead.

## 0.4.0

### Minor Changes

- [minor][1a48667bce](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a48667bce):

  Introduce import/no-dangling-slash rule

## 0.3.2

### Patch Changes

- [patch][debd87bb46](https://bitbucket.org/atlassian/atlassian-frontend/commits/debd87bb46):

  Add circular dependencies use case; add react-sortable-hoc solution

## 0.3.1

### Patch Changes

- [patch][d754bd5600](https://bitbucket.org/atlassian/atlassian-frontend/commits/d754bd5600):

  Add team information to package

## 0.3.0

### Minor Changes

- [minor][efb420d80d](https://bitbucket.org/atlassian/atlassian-frontend/commits/efb420d80d):

  Introduce import/entry-points rule

## 0.2.0

### Minor Changes

- [minor][acc2b8e334](https://bitbucket.org/atlassian/atlassian-frontend/commits/acc2b8e334):

  Introduce import/no-relative-package-imports rule

## 0.1.2

### Patch Changes

- [patch][06a0147f9c](https://bitbucket.org/atlassian/atlassian-frontend/commits/06a0147f9c):

  Add publishing info to package.json

## 0.1.1

### Patch Changes

- [patch][9f4890ef3d](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f4890ef3d):

  Move from github repository
