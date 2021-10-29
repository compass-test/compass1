# Change Log

## 1.3.0

### Minor Changes

- [`66461a66b84`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66461a66b84) - Update targets to include Avocado

## 1.2.0

### Minor Changes

- [`9145dfd3d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9145dfd3d33) - Update flow types to include Team Central in Targets

## 1.1.0

### Minor Changes

- [`6687a7a3f7f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6687a7a3f7f) - Add TEAM_CENTRAL ('townsquare') to the Targets enum

## 1.0.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.0.1

### Patch Changes

- [`a4531de37a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4531de37a) - Update exports in cross-flow integration packages

## 1.0.0

### Major Changes

- [`fb4c7eb5bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb4c7eb5bc) - Remove cross-flow-plugins dependency

  cross-flow-support no-longer re-exports values from `@atlassiansox/cross-flow-plugins`. Any product importing from `@atlassiansox/cross-flow-support/plugins` must import directly from cross-flow-plugins instead.

  For example, this legacy code:

  ```js
  import {
    createGetUsersPlugin,
    UserIdTypes,
    type UserData,
  } from '@atlassiansox/cross-flow-support/plugins';
  ```

  Must be changed to:

  ```js
  import {
    createGetUsersPlugin,
    UserIdTypes,
    type UserData,
  } from '@atlassiansox/cross-flow-plugins';
  ```

  The site-admin entrypoint has been renamed to adminhub. This change only affects usage in pf-site-admin-ui, which should now use:

  ```js
  import CrossFlowProvider from '@atlassiansox/cross-flow-support/adminhub';
  ```

## 0.8.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.8.4

### Patch Changes

- [`684c190043`](https://bitbucket.org/atlassian/atlassian-frontend/commits/684c190043) - Fix useCrossFlow to ensure the crossFlow object returned persists between calls

## 0.8.3

### Patch Changes

- [`f86c8aa9f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f86c8aa9f8) - Integrate support for CrossFlowExtensions

## 0.8.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.8.1

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.8.0

### Minor Changes

- [`e9d16ec057`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9d16ec057) - Update public exports for @atlassiansox/cross-flow-api-internals, migrate @atlassiansox/project-pages to use cross-flow-support

## 0.7.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.6.5

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 0.6.4

### Patch Changes

- [`8d27b1f014`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d27b1f014) - AFPMIGRATE-17: Migrating @atlassiansox/cross-flow-api-internals to atlassian-frontend

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.6.2...@atlassiansox/cross-flow-api-internals@0.6.3) (2020-06-18)

**Note:** Version bump only for package @atlassiansox/cross-flow-api-internals

## [0.6.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.6.1...@atlassiansox/cross-flow-api-internals@0.6.2) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-api-internals

## [0.6.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.6.0...@atlassiansox/cross-flow-api-internals@0.6.1) (2020-06-15)

### Bug Fixes

- add missing expoerts, rename some types for consistency ([b1ebe0f](https://bitbucket.org/atlassian/growth-kit/commits/b1ebe0f))

# [0.6.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.5.2...@atlassiansox/cross-flow-api-internals@0.6.0) (2020-06-12)

### Bug Fixes

- fix Promise type for open method ([0436c26](https://bitbucket.org/atlassian/growth-kit/commits/0436c26))
- resolve flow types and broken unit test ([c6151ca](https://bitbucket.org/atlassian/growth-kit/commits/c6151ca))

### Features

- implement completion status for get-started flow ([1cf971d](https://bitbucket.org/atlassian/growth-kit/commits/1cf971d))

## [0.5.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.5.1...@atlassiansox/cross-flow-api-internals@0.5.2) (2020-06-11)

### Bug Fixes

- add Targets export and TargetType for targetProduct ([3d54099](https://bitbucket.org/atlassian/growth-kit/commits/3d54099))
- readonly "enums" ([a4556ee](https://bitbucket.org/atlassian/growth-kit/commits/a4556ee))

## [0.5.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.5.0...@atlassiansox/cross-flow-api-internals@0.5.1) (2020-06-10)

### Bug Fixes

- updating flow typings for correct exact object definition ([e1f66dd](https://bitbucket.org/atlassian/growth-kit/commits/e1f66dd))

# [0.5.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.4.0...@atlassiansox/cross-flow-api-internals@0.5.0) (2020-06-05)

### Features

- add suppport for journey property in Crossflow API ([b3c9465](https://bitbucket.org/atlassian/growth-kit/commits/b3c9465))

# [0.4.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.3.3...@atlassiansox/cross-flow-api-internals@0.4.0) (2020-05-08)

### Bug Fixes

- redefine JSONValue and JSONArray types for better Flow/Typescript compatibility ([411947f](https://bitbucket.org/atlassian/growth-kit/commits/411947f))

### Features

- add support for experimentalOptions to cross-flow-support ([cc11a66](https://bitbucket.org/atlassian/growth-kit/commits/cc11a66))

## [0.3.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.3.2...@atlassiansox/cross-flow-api-internals@0.3.3) (2020-05-07)

**Note:** Version bump only for package @atlassiansox/cross-flow-api-internals

## [0.3.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.3.0...@atlassiansox/cross-flow-api-internals@0.3.2) (2020-05-01)

### Bug Fixes

- **cross-flow-api-internals:** patch bump to publish on bamboo pipeline ([eecf54f](https://bitbucket.org/atlassian/growth-kit/commits/eecf54f))

# [0.3.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.2.3...@atlassiansox/cross-flow-api-internals@0.3.0) (2020-05-01)

### Features

- **cross-flow-support:** update cross-flow-support api to return and resolve a promise when the dra ([7b3eac8](https://bitbucket.org/atlassian/growth-kit/commits/7b3eac8))

## [0.2.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.2.2...@atlassiansox/cross-flow-api-internals@0.2.3) (2020-04-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-api-internals

## [0.2.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.2.1...@atlassiansox/cross-flow-api-internals@0.2.2) (2020-04-21)

### Bug Fixes

- display name should be based on .displayName or .name of the wrapped component ([e016343](https://bitbucket.org/atlassian/growth-kit/commits/e016343))

## [0.2.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.2.0...@atlassiansox/cross-flow-api-internals@0.2.1) (2020-04-14)

### Bug Fixes

- **cross-flow-api-internals:** export withCrossFlow ([cdf1063](https://bitbucket.org/atlassian/growth-kit/commits/cdf1063))
- **cross-flow-api-internals:** rename WithCrossFlowType to WithCrossFlowProps ([07dd270](https://bitbucket.org/atlassian/growth-kit/commits/07dd270))

# [0.2.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.1.0...@atlassiansox/cross-flow-api-internals@0.2.0) (2020-04-09)

### Bug Fixes

- **cross-flow-api-internals:** remove need to omit crossflow ([d9de53b](https://bitbucket.org/atlassian/growth-kit/commits/d9de53b))
- **cross-flow-support:** don't export OmitWithCrossFlowType ([0d4111c](https://bitbucket.org/atlassian/growth-kit/commits/0d4111c))
- **cross-flow-support:** use correct typing and export types ([a6ff010](https://bitbucket.org/atlassian/growth-kit/commits/a6ff010))

### Features

- **cross-flow-support:** implement HOC for useCrossFlow ([10597e7](https://bitbucket.org/atlassian/growth-kit/commits/10597e7))

# [0.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.0.2...@atlassiansox/cross-flow-api-internals@0.1.0) (2020-02-25)

### Features

- **cross-flow-support:** update target to targetProduct ([6c71707](https://bitbucket.org/atlassian/growth-kit/commits/6c71707))

## [0.0.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-api-internals@0.0.1...@atlassiansox/cross-flow-api-internals@0.0.2) (2020-02-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-api-internals

## 0.0.1 (2020-02-13)

**Note:** Version bump only for package @atlassiansox/cross-flow-api-internals
