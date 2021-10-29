# @atlassian/commerce-types

## 2.0.5

### Patch Changes

- [`8dc3ce2f36f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8dc3ce2f36f) - Remove references to global Fetch API in test utilities

## 2.0.4

### Patch Changes

- Updated dependencies

## 2.0.3

### Patch Changes

- [`0b5922baee6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b5922baee6) - @atlassian/commerce-environment now uses @atlassian/commerce-privacy-url internally
- Updated dependencies

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`e19f1ef2b2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e19f1ef2b2e) - The "source"s in GasV3, "page"s in Metal and "telemetry-breadcrumbs" context in Sentry integrations are now shared across all Commerce packages. This means that, if an event used to have an undefined/unknown/none-value source/page/telemetry-breadcrumb it may now be populated with one if the component is being wrapped in a component from another Commerce package.

### Patch Changes

- Updated dependencies

## 1.6.4

### Patch Changes

- [`d02e35ef1e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d02e35ef1e1) - Correcting contract mocks for entitlements

## 1.6.3

### Patch Changes

- Updated dependencies

## 1.6.2

### Patch Changes

- Updated dependencies

## 1.6.1

### Patch Changes

- Updated dependencies

## 1.6.0

### Minor Changes

- [`2081707d202`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2081707d202) - Added mock exports + removed type

## 1.5.0

### Minor Changes

- [`85206836927`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85206836927) - #Please enter a summary for your changes.
  export TransactionAccountResourceId type

## 1.4.7

### Patch Changes

- [`32c8553aeff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32c8553aeff) - Exposing extends scenarios for contract testing
- [`134b21476f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/134b21476f2) - Adding contract testing to commerce components
- Updated dependencies

## 1.4.6

### Patch Changes

- Updated dependencies

## 1.4.5

### Patch Changes

- [`d61a7fa4ddb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d61a7fa4ddb) - Add types/mocks for human-readable txa
- Updated dependencies

## 1.4.4

### Patch Changes

- Updated dependencies

## 1.4.3

### Patch Changes

- Updated dependencies

## 1.4.2

### Patch Changes

- Updated dependencies

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [`0a50d9a06ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a50d9a06ec) - Cancellation order mocks (entitlements) added, created 201 mock (environment) added
- [`4df2d580183`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4df2d580183) - Cancellation order mocks and created http response mock in environment

## 1.3.0

### Minor Changes

- [`1950b9ea190`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1950b9ea190) - Improving mockability of commerce components

## 1.2.7

### Patch Changes

- Updated dependencies

## 1.2.6

### Patch Changes

- Updated dependencies

## 1.2.5

### Patch Changes

- Updated dependencies

## 1.2.4

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 1.2.3

### Patch Changes

- [`27f52f6edca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27f52f6edca) - Add multi response mocking
- Updated dependencies

## 1.2.2

### Patch Changes

- [`975da198b4b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/975da198b4b) - Skip flaky offsession tests and update tintin-bac team channels

## 1.2.1

### Patch Changes

- [`e5c858ab40c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5c858ab40c) - Updating stripe and managing state update

## 1.2.0

### Minor Changes

- [`e9df2296cdb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9df2296cdb) - added empty and single transaction account mocks

## 1.1.2

### Patch Changes

- [`b1af94b1c07`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1af94b1c07) - Fix dependencies order

## 1.1.1

### Patch Changes

- [`11b337f56d9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/11b337f56d9) - Fetch errors in Sentry now include URLs

## 1.1.0

### Minor Changes

- [`a57951405dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a57951405dd) - Updated Safeguards to include telemetry integrations entrypoints

### Patch Changes

- [`e573c4c7f69`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e573c4c7f69) - Sentry integration

## 1.0.1

### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

### Patch Changes

- Updated dependencies

## 0.4.4

### Patch Changes

- [`41aefba380`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41aefba380) - [ux] Add edge case handling scenarios for off-session 3ds confirmation challenge
- Updated dependencies

## 0.4.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.4.2

### Patch Changes

- [`5ad12c21ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ad12c21ea) - Exposing bare fetch methods

## 0.4.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.4.0

### Minor Changes

- [`755c82c36e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/755c82c36e) - Export inferred types from package root to avoid deep path references in ts declaration files
- [`22863161b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22863161b9) - Migrate to declarative entrypoints

## 0.3.7

### Patch Changes

- [`ebd5f3c530`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ebd5f3c530) - Throw rest error for http error responses

## 0.3.6

### Patch Changes

- Updated dependencies

## 0.3.5

### Patch Changes

- [`f0d31c0ab9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0d31c0ab9) - Fix mocks compatibility

## 0.3.4

### Patch Changes

- [`0e2e25b548`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e2e25b548) - Expose fetch methods from services
- Updated dependencies

## 0.3.3

### Patch Changes

- [`fb4a10074b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb4a10074b) - Fix example for no data

## 0.3.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

- Updated dependencies

## 0.3.1

### Patch Changes

- [`27662e7338`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27662e7338) - Dont use deep imports

## 0.3.0

### Minor Changes

- [`95523c31c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95523c31c6) - Improve typescript support for network mocks

## 0.2.3

### Patch Changes

- [`3d5be48420`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d5be48420) - Expose account level mocks and services

## 0.2.2

### Patch Changes

- [`08667be0ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08667be0ca) - Modify flow for CC updates and addjus it for new CC mocks

## 0.2.1

### Patch Changes

- [`f644aaa451`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f644aaa451) - Fix override without mock provider

## 0.2.0

### Minor Changes

- [`2da3e6ab9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2da3e6ab9a) - Adding StripeJS mock

## 0.1.1

### Patch Changes

- [`f9c7011aaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9c7011aaa) - Use service hook
- Updated dependencies

## 0.1.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.0.6

### Patch Changes

- [`9e46bb61c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e46bb61c1) - enforce types

## 0.0.5

### Patch Changes

- [`e375b91cd6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e375b91cd6) - Improve backend integration examples

## 0.0.4

### Patch Changes

- [`2f78f60d85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f78f60d85) - Add billing details mocks

## 0.0.3

### Patch Changes

- [`94f4899ead`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94f4899ead) - Simplify mocks

## 0.0.2

### Patch Changes

- [`5d943e1040`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d943e1040) - Introducing commerce-env

## 0.1.1

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.1.0

### Minor Changes

- [`795ecbe506`](https://bitbucket.org/atlassian/atlassian-frontend/commits/795ecbe506) - Introduce commerce types package
