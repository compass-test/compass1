# @af/utils

## 1.0.2

### Patch Changes

- [`46827697644`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46827697644) - Fix typo in the git `getBranchName` function `abrev-ref` -> `abbrev-ref` and in comments.

## 1.0.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.
