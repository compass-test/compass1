# @atlassian/ptc-test-utils

## 0.1.6

### Patch Changes

- [`4148aa7c624`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4148aa7c624) - Support orgId prop to call Legion V3 endpoint for creating team and invite members

## 0.1.5

### Patch Changes

- [`8dd62d7be69`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8dd62d7be69) - Support standalone directory as a product

## 0.1.4

### Patch Changes

- [`8f297939424`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f297939424) - Updated mock url for team creation

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

## 0.0.2

### Patch Changes

- [`604f70d27f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/604f70d27f) - Move test data into a new package @atlassian/ptc-test-utils so that @atlassian/people-teams does not depend on "fetch-mock" lib directly
