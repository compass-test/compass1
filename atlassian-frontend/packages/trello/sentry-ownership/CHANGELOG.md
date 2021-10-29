# @atlassian/sentry-ownership

## 2.0.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.0.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.0.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.1

### Patch Changes

- [`c6c0e8ca4d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6c0e8ca4d) - Update bunyan to latest to resolve sourceclear issue

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 1.2.0

### Minor Changes

- [`f44ff134a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f44ff134a1) - Adding a script to sentry client that allows a top-level fetch of team issue counts.

## 1.1.0

### Minor Changes

- [`83b4b69510`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83b4b69510) - Added support for automatically assigning sentry issues based on suggested ownership

## 1.0.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 1.0.1

### Patch Changes

- [`612d58c29c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/612d58c29c) - Update README for example usages

## 1.0.0

### Major Changes

- [`3e1832d90b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e1832d90b) - Initial version of sentry ownership
