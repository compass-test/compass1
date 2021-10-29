# @atlassian/commerce-types

## 1.0.2

### Patch Changes

- [`d61a7fa4ddb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d61a7fa4ddb) - Add types/mocks for human-readable txa

## 1.0.1

### Patch Changes

- [`00faf8cf0f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00faf8cf0f1) - Introduce commerce-entitlements package

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

## 0.2.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.2.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.2.2

### Patch Changes

- [`822dfbc325`](https://bitbucket.org/atlassian/atlassian-frontend/commits/822dfbc325) - Add renewal frequency types

## 0.2.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.2.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.1.1

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.1.0

### Minor Changes

- [`795ecbe506`](https://bitbucket.org/atlassian/atlassian-frontend/commits/795ecbe506) - Introduce commerce types package
