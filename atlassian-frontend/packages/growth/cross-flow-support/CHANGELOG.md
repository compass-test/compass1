# Change Log

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- [`41d0425779f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41d0425779f) - Removes experimental option to force Drawer to render on top of modal.

## 2.0.0

### Major Changes

- [`084b4ef4871`](https://bitbucket.org/atlassian/atlassian-frontend/commits/084b4ef4871) - Remove support for enabling Xflow UI in Cross Flow Support

### Patch Changes

- Updated dependencies

## 1.4.1

### Patch Changes

- [`5eddf1c36bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eddf1c36bb) - remove version.json and replace with build time params

## 1.4.0

### Minor Changes

- [`22c9a2e4aef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22c9a2e4aef) - Deprecate shouldUseCFFEOverride in Jira cross flow provider

## 1.3.0

### Minor Changes

- [`1bff5fa0913`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1bff5fa0913) - Deprecate experimental shouldUseCFFEOverride() option in adminhub, confluence, start and trusted-admin providers. Setting this option will no longer have any effect and will be removed in the next major release.

## 1.2.1

### Patch Changes

- [`c8a067064c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8a067064c0) - Adds an experimental option to force Drawer to render on top of modal.

## 1.2.0

### Minor Changes

- [`a45ca524a2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a45ca524a2c) - Updated dependencies

## 1.1.5

### Patch Changes

- [`f46b48ff2da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f46b48ff2da) - Fix malformed analytics event

## 1.1.4

### Patch Changes

- [`9145dfd3d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9145dfd3d33) - Update flow types to include Team Central in Targets
- Updated dependencies

## 1.1.3

### Patch Changes

- [`6687a7a3f7f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6687a7a3f7f) - Add TEAM_CENTRAL ('townsquare') to the Targets enum
- Updated dependencies

## 1.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.1.1

### Patch Changes

- [`a4531de37a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4531de37a) - Update exports in cross-flow integration packages

## 1.1.0

### Minor Changes

- [`ea67785fd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea67785fd5) - [ux][expo-223] fix Start CFFE provider and consumer, so that it can be used instead of xflow-ui

  ## Start provider

  API is aligned with providers for other products.

  - `shouldUseCFFEOverride` is a required property
  - `cloudId` is an optional property
  - `plugins` is an optional property

  ## CrossFlowView

  - `CrossFlowViewProps` uses more prcise types (e.g. `ProductKeys` instead of `string` for `targetProduct`)
  - `shouldUseCFFEOverride` is a new required property
  - `extensions` is a new optional property
  - `CrossFlowView` itself is deprecated, should be replaced by `CrossFlowConsumer.tsx` to avoid further diversion from what other products use.

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

### Patch Changes

- Updated dependencies

## 0.29.6

### Patch Changes

- [`c95752cf81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c95752cf81) - Ensure CrossFlowConsumer only invokes crossFlow api once.

## 0.29.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.29.4

### Patch Changes

- [`21e218c73d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21e218c73d) - Prevent infinite re-renders of the CrossFlowConsumer component

## 0.29.3

### Patch Changes

- [`f86c8aa9f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f86c8aa9f8) - Integrate support for CrossFlowExtensions

## 0.29.2

### Patch Changes

- Updated dependencies

## 0.29.1

### Patch Changes

- [`f0eab8ab72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0eab8ab72) - EXPO-286 Create a CrossFlowConsumer component for immediately opening the cross flow journey upon rendering

## 0.29.0

### Minor Changes

- [`1f91d18db8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f91d18db8) - add `plugins` and required `shouldUseCFFEOverride` prop to site-admin entry point

## 0.28.2

### Patch Changes

- Updated dependencies

## 0.28.1

### Patch Changes

- [`808071739c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/808071739c) - refactor setting attributes for analyticsEvent in CrossFlowProvider

## 0.28.0

### Minor Changes

- [`9b5a8cbcb7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b5a8cbcb7) - [ux] Expose API to use cross-flow-frontend in Trusted Admin

## 0.27.0

### Minor Changes

- [`4cca9be38d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cca9be38d) - [ux] Expose API to use cross-flow-frontend in Confluence

## 0.26.1

### Patch Changes

- [`e173692f30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e173692f30) - Add missing JiraProps to fix flow types

## 0.26.0

### Minor Changes

- [`5dfd0c9cfb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dfd0c9cfb) - Add onError to CrossFlowProvider

## 0.25.0

### Minor Changes

- [`df623a70b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df623a70b6) - Cross-flow-support provider for Site Admin

## 0.24.4

### Patch Changes

- [`c425712806`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c425712806) - Bump cross flow dependencies in package.json to the latest version in monorepo manually
  Update get_started journey to allow CFFE to be rendered if shouldUseCFFEOverride is true

## 0.24.3

### Patch Changes

- [`eb31f635ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb31f635ab) - Cross Flow Support should pass extra parameters (journey, env) to Cross Flow SPAs

## 0.24.2

### Patch Changes

- [`f9729cc21f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9729cc21f) - export flowtypes for plugins

## 0.24.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.24.0

### Minor Changes

- [`3d9c4c6acd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d9c4c6acd) - Expose API to use cross-flow-frontend. Remove isTenantless property and redefine with shouldUseCFFEOverride

## 0.23.11

### Patch Changes

- [`8c24688809`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c24688809) - Configured Bitbucket to use CFFE experience

## 0.23.10

### Patch Changes

- Updated dependencies

## 0.23.9

### Patch Changes

- [`ba4dd44f59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba4dd44f59) - Replace "AtlassianSwitcher" sourceComponent with "atlassian-switcher"

## 0.23.8

### Patch Changes

- Updated dependencies

## 0.23.7

### Patch Changes

- [`c689894c49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c689894c49) - Bump product-store-react to ^0.19.5 for cross-flow-support

## 0.23.6

### Patch Changes

- [`e9f5c44559`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9f5c44559) - Bump product-store-react dependency

## 0.23.5

### Patch Changes

- [`eeb1534e47`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eeb1534e47) - CROSSFLOW-566 launch CFFE when target product is BB

## 0.23.4

### Patch Changes

- [`c03c7f7cb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c03c7f7cb8) - Remove redirectToWac from integration view for the "discover" and "decide" journeys. Add isLinkExpansion prop to ProductStoreIntegration

## 0.23.3

### Patch Changes

- [`5ac9d6da4b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ac9d6da4b) - Bump cross-flow-plugins dep to ^0.5.1

## 0.23.2

### Patch Changes

- [`a9842cb479`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9842cb479) - Relevant Jira issue: CROSSFLOW-519 add plugins to the JiraProps interface in cross-flow-support

## 0.23.1

### Patch Changes

- [`28d5909270`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28d5909270) - Remove setState to defaultState on Drawer close

## 0.23.0

### Minor Changes

- [`6ece914ca0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ece914ca0) - For 'decide' journey it now displays the benefits page with no back button to product store index page.

## 0.22.1

### Patch Changes

- Updated dependencies

## 0.22.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.21.3

### Patch Changes

- [`97e09fd5e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97e09fd5e5) - Add plugin support to Product Store

## 0.21.2

### Patch Changes

- [`86c8e3117d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/86c8e3117d) - Update redirectHelper to add UTM params

## 0.21.1

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 0.21.0

### Minor Changes

- [`01e84f3d9e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01e84f3d9e) - Add responsive styles to cross-flow-support wrapping drawer component

## 0.20.4

### Patch Changes

- [`738296aa4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/738296aa4f) - Rename webpack chunk for cross-flow-support-deferred

## 0.20.3

### Patch Changes

- [`e146e0eadf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e146e0eadf) - Add entry point for start

## 0.20.2

### Patch Changes

- [`bc5036d662`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc5036d662) - Publish to include new version of cross-flow-plugins

## 0.20.1

### Patch Changes

- [`d6b46e1ead`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6b46e1ead) - Migrate cross-flow-support into atlassian-frontend

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.20.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.7...@atlassiansox/cross-flow-support@0.20.0) (2020-06-18)

### Features

- **cross-flow-support:** expose plugins in TrelloCrossFlowProvider interface ([752e8ff](https://bitbucket.org/atlassian/growth-kit/commits/752e8ff))

## [0.19.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.6...@atlassiansox/cross-flow-support@0.19.7) (2020-06-18)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.19.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.5...@atlassiansox/cross-flow-support@0.19.6) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.19.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.4...@atlassiansox/cross-flow-support@0.19.5) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.19.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.3...@atlassiansox/cross-flow-support@0.19.4) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.19.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.2...@atlassiansox/cross-flow-support@0.19.3) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.19.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.1...@atlassiansox/cross-flow-support@0.19.2) (2020-06-15)

### Bug Fixes

- add default entrypoint with common exports ([9b78be5](https://bitbucket.org/atlassian/growth-kit/commits/9b78be5))
- add missing expoerts, rename some types for consistency ([b1ebe0f](https://bitbucket.org/atlassian/growth-kit/commits/b1ebe0f))

## [0.19.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.19.0...@atlassiansox/cross-flow-support@0.19.1) (2020-06-12)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.19.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.18.0...@atlassiansox/cross-flow-support@0.19.0) (2020-06-12)

### Bug Fixes

- resolve flow types and broken unit test ([c6151ca](https://bitbucket.org/atlassian/growth-kit/commits/c6151ca))
- set completionStatus when redirectToWac is true for get-started journey ([63a1ce0](https://bitbucket.org/atlassian/growth-kit/commits/63a1ce0))

### Features

- implement completion status for get-started flow ([1cf971d](https://bitbucket.org/atlassian/growth-kit/commits/1cf971d))

# [0.18.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.17.2...@atlassiansox/cross-flow-support@0.18.0) (2020-06-11)

### Features

- **cross-flow-support:** create RedirectToWacDefinition to keep IntegrationViewProps clean ([beb1c11](https://bitbucket.org/atlassian/growth-kit/commits/beb1c11))
- **cross-flow-support:** move RedirectToWacDefinition main types lib ([c2a9a06](https://bitbucket.org/atlassian/growth-kit/commits/c2a9a06))
- **cross-flow-support:** remove import from product-store-react in CrossFlowProvider ([e3d979e](https://bitbucket.org/atlassian/growth-kit/commits/e3d979e))
- **cross-flow-support:** short circuit IntegrationView when journey is 'get-started' and should red ([138c021](https://bitbucket.org/atlassian/growth-kit/commits/138c021))
- **cross-flow-support:** simplify wacUrl ternary condition ([ed7f251](https://bitbucket.org/atlassian/growth-kit/commits/ed7f251))
- **cross-flow-support:** support expansions to WAC in cross-flow-support ([110e291](https://bitbucket.org/atlassian/growth-kit/commits/110e291))
- **cross-flow-support:** use env prop instead of window.location to set wacUrl to staging or produc ([fcb8922](https://bitbucket.org/atlassian/growth-kit/commits/fcb8922))

## [0.17.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.17.1...@atlassiansox/cross-flow-support@0.17.2) (2020-06-11)

### Bug Fixes

- add Targets export and TargetType for targetProduct ([3d54099](https://bitbucket.org/atlassian/growth-kit/commits/3d54099))

## [0.17.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.17.0...@atlassiansox/cross-flow-support@0.17.1) (2020-06-10)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.17.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.16.0...@atlassiansox/cross-flow-support@0.17.0) (2020-06-09)

### Features

- define trusted-admin entry point for cross-flow-support ([d9284e7](https://bitbucket.org/atlassian/growth-kit/commits/d9284e7))

# [0.16.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.15.0...@atlassiansox/cross-flow-support@0.16.0) (2020-06-05)

### Features

- add suppport for journey property in Crossflow API ([b3c9465](https://bitbucket.org/atlassian/growth-kit/commits/b3c9465))

# [0.15.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.14.2...@atlassiansox/cross-flow-support@0.15.0) (2020-06-04)

### Features

- **cross-flow-support:** enriched cross-flow-support analytics events with sourceContext and source ([94affe7](https://bitbucket.org/atlassian/growth-kit/commits/94affe7))

## [0.14.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.14.1...@atlassiansox/cross-flow-support@0.14.2) (2020-06-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.14.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.14.0...@atlassiansox/cross-flow-support@0.14.1) (2020-06-03)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.14.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.13.1...@atlassiansox/cross-flow-support@0.14.0) (2020-06-03)

### Features

- remove unnecessary Suspense component from Start's CrossFlowView component ([45dd559](https://bitbucket.org/atlassian/growth-kit/commits/45dd559))

## [0.13.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.13.0...@atlassiansox/cross-flow-support@0.13.1) (2020-06-02)

### Bug Fixes

- improve type interfaces for plugins in cross-flow-support and cross-flow-react ([e718fc5](https://bitbucket.org/atlassian/growth-kit/commits/e718fc5))

# [0.13.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.12.3...@atlassiansox/cross-flow-support@0.13.0) (2020-06-01)

### Bug Fixes

- fixes bug where experimentalOptions was incorrectly serialised when sent as a query param to cr ([5446dda](https://bitbucket.org/atlassian/growth-kit/commits/5446dda))

### Features

- expose new CrossFlowView component to be used for WAC expands in Start ([40d6e1a](https://bitbucket.org/atlassian/growth-kit/commits/40d6e1a))
- pR feedback - leverage experimentalOptions for WAC expansion props ([a0312a7](https://bitbucket.org/atlassian/growth-kit/commits/a0312a7))
- remove lazy loading, change CrossFlowView to be a named export internally to avoid confusion i ([731de2c](https://bitbucket.org/atlassian/growth-kit/commits/731de2c))

## [0.12.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.12.2...@atlassiansox/cross-flow-support@0.12.3) (2020-05-29)

### Bug Fixes

- export additional types necessary from plugins in cross-flow-support and amend eslintrc for web ([9298327](https://bitbucket.org/atlassian/growth-kit/commits/9298327))

## [0.12.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.12.1...@atlassiansox/cross-flow-support@0.12.2) (2020-05-29)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.12.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.12.0...@atlassiansox/cross-flow-support@0.12.1) (2020-05-20)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.12.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.12...@atlassiansox/cross-flow-support@0.12.0) (2020-05-08)

### Features

- add support for experimentalOptions to cross-flow-support ([cc11a66](https://bitbucket.org/atlassian/growth-kit/commits/cc11a66))

## [0.11.12](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.11...@atlassiansox/cross-flow-support@0.11.12) (2020-05-07)

### Bug Fixes

- update provider to accept AnalyticsWebClientInterface as a Promise ([1759500](https://bitbucket.org/atlassian/growth-kit/commits/1759500))

## [0.11.11](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.10...@atlassiansox/cross-flow-support@0.11.11) (2020-05-06)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.10](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.9...@atlassiansox/cross-flow-support@0.11.10) (2020-05-06)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.8...@atlassiansox/cross-flow-support@0.11.9) (2020-05-05)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.7...@atlassiansox/cross-flow-support@0.11.8) (2020-05-05)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.6...@atlassiansox/cross-flow-support@0.11.7) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.5...@atlassiansox/cross-flow-support@0.11.6) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.4...@atlassiansox/cross-flow-support@0.11.5) (2020-05-04)

### Bug Fixes

- **cross-flow-support:** fix for firing duplicate uiInitialized events ([6504876](https://bitbucket.org/atlassian/growth-kit/commits/6504876))

## [0.11.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.3...@atlassiansox/cross-flow-support@0.11.4) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.2...@atlassiansox/cross-flow-support@0.11.3) (2020-05-01)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.11.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.11.0...@atlassiansox/cross-flow-support@0.11.2) (2020-05-01)

### Bug Fixes

- **cross-flow-support:** minor bump as bamboo failed to build ([1aaeeca](https://bitbucket.org/atlassian/growth-kit/commits/1aaeeca))

# [0.11.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.10.1...@atlassiansox/cross-flow-support@0.11.0) (2020-05-01)

### Features

- **cross-flow-support:** update cross-flow-support api to return and resolve a promise when the dra ([7b3eac8](https://bitbucket.org/atlassian/growth-kit/commits/7b3eac8))

## [0.10.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.10.0...@atlassiansox/cross-flow-support@0.10.1) (2020-04-29)

### Bug Fixes

- **cross-flow-frontend:** address comments on PR ([e9a8d46](https://bitbucket.org/atlassian/growth-kit/commits/e9a8d46))

# [0.10.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.7...@atlassiansox/cross-flow-support@0.10.0) (2020-04-29)

### Features

- add rpc client to SpaChildClient and relevant files in cross flow spa and cross flow frontend ([62b40d7](https://bitbucket.org/atlassian/growth-kit/commits/62b40d7))

## [0.9.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.6...@atlassiansox/cross-flow-support@0.9.7) (2020-04-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.9.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.5...@atlassiansox/cross-flow-support@0.9.6) (2020-04-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.9.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.4...@atlassiansox/cross-flow-support@0.9.5) (2020-04-23)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.9.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.3...@atlassiansox/cross-flow-support@0.9.4) (2020-04-22)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.9.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.2...@atlassiansox/cross-flow-support@0.9.3) (2020-04-21)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.9.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.1...@atlassiansox/cross-flow-support@0.9.2) (2020-04-21)

### Performance Improvements

- **cross-flow-support:** bundle analytics transformer from iframe-plugin ([a97ecad](https://bitbucket.org/atlassian/growth-kit/commits/a97ecad))

## [0.9.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.9.0...@atlassiansox/cross-flow-support@0.9.1) (2020-04-17)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.9.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.8.4...@atlassiansox/cross-flow-support@0.9.0) (2020-04-17)

### Features

- **cross-flow-support:** add analytic event for intent to open UI ([e6ab9aa](https://bitbucket.org/atlassian/growth-kit/commits/e6ab9aa))

## [0.8.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.8.3...@atlassiansox/cross-flow-support@0.8.4) (2020-04-16)

### Bug Fixes

- pass originProduct to product store ([cd253c7](https://bitbucket.org/atlassian/growth-kit/commits/cd253c7))

## [0.8.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.8.2...@atlassiansox/cross-flow-support@0.8.3) (2020-04-15)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.8.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.8.1...@atlassiansox/cross-flow-support@0.8.2) (2020-04-15)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.8.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.8.0...@atlassiansox/cross-flow-support@0.8.1) (2020-04-14)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.8.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.7.0...@atlassiansox/cross-flow-support@0.8.0) (2020-04-14)

### Features

- **cross-flow-support:** add start provider to cross-flow-support ([8368b81](https://bitbucket.org/atlassian/growth-kit/commits/8368b81))

# [0.7.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.6.4...@atlassiansox/cross-flow-support@0.7.0) (2020-04-14)

### Features

- **cross-flow-spa:** Replace ProductKey enum with OriginProduct enum for originProduct prop ([05e449b](https://bitbucket.org/atlassian/growth-kit/commits/05e449b))

## [0.6.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.6.3...@atlassiansox/cross-flow-support@0.6.4) (2020-04-14)

### Bug Fixes

- **cross-flow-support:** export withCrossFlow and associated type ([7488580](https://bitbucket.org/atlassian/growth-kit/commits/7488580))
- **cross-flow-support:** update exported type name ([6e5710a](https://bitbucket.org/atlassian/growth-kit/commits/6e5710a))

## [0.6.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.6.2...@atlassiansox/cross-flow-support@0.6.3) (2020-04-09)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.6.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.6.1...@atlassiansox/cross-flow-support@0.6.2) (2020-04-06)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.6.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.6.0...@atlassiansox/cross-flow-support@0.6.1) (2020-04-06)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.6.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.5.1...@atlassiansox/cross-flow-support@0.6.0) (2020-04-06)

### Bug Fixes

- export UserIds for use in consumers as well ([0776a08](https://bitbucket.org/atlassian/growth-kit/commits/0776a08))

### Features

- refactor to atlassiansox prefix and make a public package with all required exports for consum ([d345d7a](https://bitbucket.org/atlassian/growth-kit/commits/d345d7a))

## [0.5.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.5.0...@atlassiansox/cross-flow-support@0.5.1) (2020-04-05)

### Bug Fixes

- **product-store-react,cross-flow-support:** cross-flow-support should not set cloudId to invalid va ([d424fff](https://bitbucket.org/atlassian/growth-kit/commits/d424fff))

# [0.5.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.6...@atlassiansox/cross-flow-support@0.5.0) (2020-04-01)

### Features

- **cross-flow-support:** enrich all analytics passed through cross-flow-support with package detail ([b5f2de7](https://bitbucket.org/atlassian/growth-kit/commits/b5f2de7))

## [0.4.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.5...@atlassiansox/cross-flow-support@0.4.6) (2020-03-30)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.4.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.4...@atlassiansox/cross-flow-support@0.4.5) (2020-03-26)

### Bug Fixes

- **cross-flow-support:** conditionally set zIndex on Drawer close button ([cec5769](https://bitbucket.org/atlassian/growth-kit/commits/cec5769))
- override modal/loader elements from cross-flow-react, minor fixes ([73e8c54](https://bitbucket.org/atlassian/growth-kit/commits/73e8c54))

## [0.4.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.3...@atlassiansox/cross-flow-support@0.4.4) (2020-03-18)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.4.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.2...@atlassiansox/cross-flow-support@0.4.3) (2020-03-12)

### Bug Fixes

- **cross-flow-support:** fix close button position ([6904746](https://bitbucket.org/atlassian/growth-kit/commits/6904746))

## [0.4.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.1...@atlassiansox/cross-flow-support@0.4.2) (2020-03-10)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.4.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.4.0...@atlassiansox/cross-flow-support@0.4.1) (2020-02-27)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.4.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.6...@atlassiansox/cross-flow-support@0.4.0) (2020-02-25)

### Features

- **cross-flow-support:** update target to targetProduct ([6c71707](https://bitbucket.org/atlassian/growth-kit/commits/6c71707))

## [0.3.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.5...@atlassiansox/cross-flow-support@0.3.6) (2020-02-25)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.3.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.4...@atlassiansox/cross-flow-support@0.3.5) (2020-02-25)

### Bug Fixes

- **cross-flow-support:** updating children typings in entry point ([268fa12](https://bitbucket.org/atlassian/growth-kit/commits/268fa12))

## [0.3.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.3...@atlassiansox/cross-flow-support@0.3.4) (2020-02-25)

### Bug Fixes

- **cross-flow-support:** unmount view layer once drawer transition ends ([e735baa](https://bitbucket.org/atlassian/growth-kit/commits/e735baa))

## [0.3.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.2...@atlassiansox/cross-flow-support@0.3.3) (2020-02-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.3.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.1...@atlassiansox/cross-flow-support@0.3.2) (2020-02-24)

### Bug Fixes

- **cross-flow-support:** add a tenantless cross-flow-frontend view state ([c1651e4](https://bitbucket.org/atlassian/growth-kit/commits/c1651e4))

## [0.3.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.3.0...@atlassiansox/cross-flow-support@0.3.1) (2020-02-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

# [0.3.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.2.0...@atlassiansox/cross-flow-support@0.3.0) (2020-02-21)

### Features

- **cross-flow-support:** enable tenantless product-store for no cloudId flowa ([b8c0b68](https://bitbucket.org/atlassian/growth-kit/commits/b8c0b68))

# [0.2.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.1.0...@atlassiansox/cross-flow-support@0.2.0) (2020-02-20)

### Features

- **cross-flow-support:** add entry point for BB ([04aba96](https://bitbucket.org/atlassian/growth-kit/commits/04aba96))

# [0.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.8...@atlassiansox/cross-flow-support@0.1.0) (2020-02-20)

### Features

- **cross-flow-support:** abstract analytics events firing to integration level. Add error boundary ([ec115ff](https://bitbucket.org/atlassian/growth-kit/commits/ec115ff))

## [0.0.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.7...@atlassiansox/cross-flow-support@0.0.8) (2020-02-19)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.0.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.6...@atlassiansox/cross-flow-support@0.0.7) (2020-02-19)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.0.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.5...@atlassiansox/cross-flow-support@0.0.6) (2020-02-17)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.0.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.4...@atlassiansox/cross-flow-support@0.0.5) (2020-02-14)

### Bug Fixes

- **cross-flow-support:** update overrides on drawer ([c5df517](https://bitbucket.org/atlassian/growth-kit/commits/c5df517))

## [0.0.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.3...@atlassiansox/cross-flow-support@0.0.4) (2020-02-13)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.0.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.2...@atlassiansox/cross-flow-support@0.0.3) (2020-02-13)

**Note:** Version bump only for package @atlassiansox/cross-flow-support

## [0.0.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-support@0.0.1...@atlassiansox/cross-flow-support@0.0.2) (2020-02-13)

### Bug Fixes

- **cross-flow-support:** add copy-pkg step to prepack for publishing ([6bb5b79](https://bitbucket.org/atlassian/growth-kit/commits/6bb5b79))

## 0.0.1 (2020-02-13)

**Note:** Version bump only for package @atlassiansox/cross-flow-support
