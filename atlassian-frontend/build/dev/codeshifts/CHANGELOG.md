# @atlaskit/codeshifts

## 0.1.6

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.5

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.1.4

### Patch Changes

- [`7df164a26a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df164a26a) - Remove usage of deprecated fields.
- Updated dependencies

## 0.1.3

### Patch Changes

- [patch][6decbec47e](https://bitbucket.org/atlassian/atlassian-frontend/commits/6decbec47e):

  Update package.json formatter to add releaseModel fields

## 0.1.2

### Patch Changes

- [patch][0ef8a7a973](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ef8a7a973):

  Update package-json-formatter codeshift to transform fields as per https://hello.atlassian.net/wiki/spaces/~hobweger/pages/668331437/RFC+atlassian-frontend+package+categories+and+.jsons

## 0.1.1

### Patch Changes

- [patch][c9cc4346d6](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9cc4346d6):

  Split `lodash` using the exact import required.

## 0.1.0

### Minor Changes

- [minor][dc5cca8451](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc5cca8451):

  Add package.json formatting script

## 0.0.2

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports
