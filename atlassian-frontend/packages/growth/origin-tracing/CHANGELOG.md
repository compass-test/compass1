# @atlassiansox/origin-tracing

## 6.0.6

### Patch Changes

- [`e1fc6f6781e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1fc6f6781e) - Added npmignore to exclude src and dev only related directories

## 6.0.5

### Patch Changes

- [`b441dd7a157`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b441dd7a157) - Fix origin tracing for URLs with a hash but no query parameters

## 6.0.4

### Patch Changes

- [`5eddf1c36bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eddf1c36bb) - remove version.json and replace with build time params

## 6.0.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 6.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 6.0.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 6.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 5.1.0

### Minor Changes

- [`299b501c22`](https://bitbucket.org/atlassian/atlassian-frontend/commits/299b501c22) - Accept NanoIDs, add originLibrary analytics attribute

## 5.0.0

### Major Changes

- [`4b930482f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b930482f6) - Migrated Origin Tracing from experiment-js

  - No changes to the API
  - Rewritten in TypeScript
  - Streamlined dependencies
  - BREAKING: IE now requires a polyfill for URLSearchParams, please make sure you're including it
  - BREAKING: Node now supported only from version 7.5.0 onward (or in the 6.x stream: from 6.13.0)
