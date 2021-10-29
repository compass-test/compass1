# @atlassian/commerce-links

## 1.0.1

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

## 0.1.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.1.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.0.3

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.0.2

### Patch Changes

- [patch][52aecf7b3c](https://bitbucket.org/atlassian/atlassian-frontend/commits/52aecf7b3c):

  Publish commerce-links
