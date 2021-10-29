# Change Log

## 1.2.1

### Patch Changes

- [`5e42602e289`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e42602e289) - Remove call to onChangeRoute when the event.type is LEARN_MORE_CLICKED

## 1.2.0

### Minor Changes

- [`2dfcef852d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2dfcef852d3) - pass iframeIsEmbedded from URL params to iframe-plugin

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [`5a522946653`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a522946653) - Add readyTimeout event to iframe-plugin

  Breaking change: pollingThresholdMilliseconds iframe-plugin constructor option is replaced with handshakeEventTimeoutDelayMilliSeconds and readyEventTimeoutDelayMilliSeconds
  Reason for change: added readyTimeout SLI bad event to monitor cross-flow-support SLOs
  How to update: Cross-flow dependencies (product-store-react and cross-flow-react) are already updated with the new parameters. Up-flow dependencies need to be manually updated to use the new parameters.

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

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

## 0.19.11

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.19.10

### Patch Changes

- [`f86c8aa9f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f86c8aa9f8) - Integrate support for CrossFlowExtensions

## 0.19.9

### Patch Changes

- Updated dependencies

## 0.19.8

### Patch Changes

- [`eb31f635ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb31f635ab) - Cross Flow Support should pass extra parameters (journey, env) to Cross Flow SPAs

## 0.19.7

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.19.6

### Patch Changes

- Updated dependencies

## 0.19.5

### Patch Changes

- [`e8d5adafbc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8d5adafbc) - Add sourceComponent & sourceContext props to ProductStoreIntegration, pass sourceComponent & sourceContext props as query params to iframe

## 0.19.4

### Patch Changes

- [`c03c7f7cb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c03c7f7cb8) - Remove redirectToWac from integration view for the "discover" and "decide" journeys. Add isLinkExpansion prop to ProductStoreIntegration

## 0.19.3

### Patch Changes

- [`9a02515e2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a02515e2d) - CROSSFLOW-500 Add route for Bitbucket learn more

## 0.19.2

### Patch Changes

- [`54d281b49e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54d281b49e) - Stringify experimentalOptions

## 0.19.1

### Patch Changes

- [`3a639b7ac9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3a639b7ac9) - Fix hook dependency

## 0.19.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.18.5

### Patch Changes

- [`97e09fd5e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97e09fd5e5) - Add plugin support to Product Store

## 0.18.4

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 0.18.3

### Patch Changes

- [`26673be5f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26673be5f6) - Fix useEffect deps

## 0.18.2

### Patch Changes

- [`95e91dadd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95e91dadd9) - Migrate product-store-react to atlassian-frontend

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.18.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.18.0...@atlassiansox/product-store-react@0.18.1) (2020-06-04)

**Note:** Version bump only for package @atlassiansox/product-store-react

# [0.18.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.15...@atlassiansox/product-store-react@0.18.0) (2020-05-08)

### Bug Fixes

- redefine JSONValue and JSONArray types for better Flow/Typescript compatibility ([411947f](https://bitbucket.org/atlassian/growth-kit/commits/411947f))

### Features

- add support for experimentalOptions to cross-flow-support ([cc11a66](https://bitbucket.org/atlassian/growth-kit/commits/cc11a66))

## [0.17.15](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.14...@atlassiansox/product-store-react@0.17.15) (2020-05-06)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.14](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.13...@atlassiansox/product-store-react@0.17.14) (2020-05-05)

### Bug Fixes

- **cross-flow-support:** update cross-flow-react and product-store-react to initialise after onAnaly ([1c204f3](https://bitbucket.org/atlassian/growth-kit/commits/1c204f3))

## [0.17.13](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.12...@atlassiansox/product-store-react@0.17.13) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.12](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.11...@atlassiansox/product-store-react@0.17.12) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.11](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.10...@atlassiansox/product-store-react@0.17.11) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.10](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.9...@atlassiansox/product-store-react@0.17.10) (2020-05-01)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.8...@atlassiansox/product-store-react@0.17.9) (2020-04-29)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.7...@atlassiansox/product-store-react@0.17.8) (2020-04-24)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.6...@atlassiansox/product-store-react@0.17.7) (2020-04-23)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.5...@atlassiansox/product-store-react@0.17.6) (2020-04-17)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.4...@atlassiansox/product-store-react@0.17.5) (2020-04-16)

### Bug Fixes

- pass originProduct to product store ([cd253c7](https://bitbucket.org/atlassian/growth-kit/commits/cd253c7))

## [0.17.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.3...@atlassiansox/product-store-react@0.17.4) (2020-04-15)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.2...@atlassiansox/product-store-react@0.17.3) (2020-04-15)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.1...@atlassiansox/product-store-react@0.17.2) (2020-04-09)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.17.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.17.0...@atlassiansox/product-store-react@0.17.1) (2020-04-06)

### Bug Fixes

- **product-store-react:** change order of imports ([8caffc1](https://bitbucket.org/atlassian/growth-kit/commits/8caffc1))

# [0.17.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.16.3...@atlassiansox/product-store-react@0.17.0) (2020-04-06)

### Features

- **product-store-react:** add isStandaloneProductPage API for product-store-react and pass it to th ([b093154](https://bitbucket.org/atlassian/growth-kit/commits/b093154))

## [0.16.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.16.2...@atlassiansox/product-store-react@0.16.3) (2020-04-05)

### Bug Fixes

- **product-store-react,cross-flow-support:** cross-flow-support should not set cloudId to invalid va ([d424fff](https://bitbucket.org/atlassian/growth-kit/commits/d424fff))

## [0.16.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.16.1...@atlassiansox/product-store-react@0.16.2) (2020-03-26)

### Bug Fixes

- override modal/loader elements from cross-flow-react, minor fixes ([73e8c54](https://bitbucket.org/atlassian/growth-kit/commits/73e8c54))

## [0.16.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.16.0...@atlassiansox/product-store-react@0.16.1) (2020-02-20)

**Note:** Version bump only for package @atlassiansox/product-store-react

# [0.16.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.9...@atlassiansox/product-store-react@0.16.0) (2020-02-19)

### Features

- **product-store-react:** update product store integration to use own defined modal and loaders ([ef1df88](https://bitbucket.org/atlassian/growth-kit/commits/ef1df88))

## [0.15.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.8...@atlassiansox/product-store-react@0.15.9) (2020-02-19)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.15.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.7...@atlassiansox/product-store-react@0.15.8) (2020-02-17)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.15.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.6...@atlassiansox/product-store-react@0.15.7) (2020-02-13)

### Bug Fixes

- remove unnecessary nested eslintrc config files ([bd84cce](https://bitbucket.org/atlassian/growth-kit/commits/bd84cce))

## [0.15.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.5...@atlassiansox/product-store-react@0.15.6) (2020-02-13)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.15.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.4...@atlassiansox/product-store-react@0.15.5) (2020-02-12)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.15.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.3...@atlassiansox/product-store-react@0.15.4) (2020-02-12)

### Bug Fixes

- introduce react-hooks eslint rules and update files as necessary ([869144c](https://bitbucket.org/atlassian/growth-kit/commits/869144c))

## [0.15.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.2...@atlassiansox/product-store-react@0.15.3) (2020-02-10)

### Bug Fixes

- simplify API for product-store as isEnrolledInCFEv2Variation and isPrefetchAvailableSitesEnable ([acd8582](https://bitbucket.org/atlassian/growth-kit/commits/acd8582))

## [0.15.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.1...@atlassiansox/product-store-react@0.15.2) (2020-01-31)

### Bug Fixes

- add isPrefetchAvailableSitesEnabled prop for controlling the product store iframe loader ([5eb18f5](https://bitbucket.org/atlassian/growth-kit/commits/5eb18f5))

## [0.15.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.15.0...@atlassiansox/product-store-react@0.15.1) (2020-01-30)

### Bug Fixes

- introduce required types to product-store-react package instead of importing from product store ([8be7e31](https://bitbucket.org/atlassian/growth-kit/commits/8be7e31))
- refactor availableSitesUrl functionality to prefetchedAvailableSites to avoid CORS issues in th ([e03c0ad](https://bitbucket.org/atlassian/growth-kit/commits/e03c0ad))

# [0.15.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.14.0...@atlassiansox/product-store-react@0.15.0) (2020-01-29)

### Features

- introduce the availableSitesUrl prop that can be passed to product-store to override the endpo ([f98dc96](https://bitbucket.org/atlassian/growth-kit/commits/f98dc96))

# [0.14.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.13.0...@atlassiansox/product-store-react@0.14.0) (2020-01-29)

### Features

- introduce new isEnrolledInCFEv2Variation prop to toggle isCompactContext or not on ProductPage ([22b209f](https://bitbucket.org/atlassian/growth-kit/commits/22b209f))

# [0.13.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.13.0) (2020-01-23)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.12.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.12.0) (2020-01-23)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.11.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.11.0) (2020-01-23)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.10.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.10.0) (2020-01-23)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.9.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.9.0) (2020-01-23)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.8.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.8.0) (2020-01-23)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.7.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.7.0) (2020-01-22)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

## [0.6.27](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.27) (2020-01-22)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.26](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.26) (2020-01-22)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.25](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.25) (2020-01-22)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.24](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.24) (2020-01-22)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.23](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.23) (2020-01-21)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.22](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.22) (2020-01-21)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.21](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.21) (2020-01-21)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.20](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.20) (2020-01-20)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.19](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.19) (2020-01-20)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.18](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.18) (2020-01-20)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.17](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.17) (2020-01-20)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

## [0.6.16](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.15...@atlassiansox/product-store-react@0.6.16) (2020-01-20)

### Bug Fixes

- share growth-constant types across integration components ([0bc07de](https://bitbucket.org/atlassian/growth-kit/commits/0bc07de))

## [0.6.15](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.14...@atlassiansox/product-store-react@0.6.15) (2019-12-18)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.14](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.13...@atlassiansox/product-store-react@0.6.14) (2019-12-06)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.13](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.12...@atlassiansox/product-store-react@0.6.13) (2019-12-06)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.12](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.11...@atlassiansox/product-store-react@0.6.12) (2019-12-05)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.11](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.10...@atlassiansox/product-store-react@0.6.11) (2019-11-04)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.10](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.9...@atlassiansox/product-store-react@0.6.10) (2019-10-30)

### Bug Fixes

- disable coverage from all tests ([34f4660](https://bitbucket.org/atlassian/growth-kit/commits/34f4660))

## [0.6.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.8...@atlassiansox/product-store-react@0.6.9) (2019-10-22)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.7...@atlassiansox/product-store-react@0.6.8) (2019-10-21)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.6...@atlassiansox/product-store-react@0.6.7) (2019-10-17)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.5...@atlassiansox/product-store-react@0.6.6) (2019-10-16)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.4...@atlassiansox/product-store-react@0.6.5) (2019-10-14)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.3...@atlassiansox/product-store-react@0.6.4) (2019-10-14)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.2...@atlassiansox/product-store-react@0.6.3) (2019-10-10)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.1...@atlassiansox/product-store-react@0.6.2) (2019-10-02)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.6.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.6.0...@atlassiansox/product-store-react@0.6.1) (2019-10-01)

### Bug Fixes

- **product-store-react:** fix package exports, non BC changes were introduced in prev minor update ([e62b81d](https://bitbucket.org/atlassian/growth-kit/commits/e62b81d))

# [0.6.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.5.4...@atlassiansox/product-store-react@0.6.0) (2019-09-30)

### Features

- **product-store-react:** expose onAnalyticsEvent prop to handle events from the consumer side ([47480b8](https://bitbucket.org/atlassian/growth-kit/commits/47480b8))

## [0.5.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.5.3...@atlassiansox/product-store-react@0.5.4) (2019-09-30)

### Bug Fixes

- **product-store-react:** adding missing / for IE fix ([82508bd](https://bitbucket.org/atlassian/growth-kit/commits/82508bd))

## [0.5.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.5.2...@atlassiansox/product-store-react@0.5.3) (2019-09-27)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.5.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.5.1...@atlassiansox/product-store-react@0.5.2) (2019-09-27)

### Bug Fixes

- **product-store-react:** downgrading query-string ([e057a8b](https://bitbucket.org/atlassian/growth-kit/commits/e057a8b))
- **product-store-react:** downgrading query-string dep ([f0b139e](https://bitbucket.org/atlassian/growth-kit/commits/f0b139e))

## [0.5.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.5.0...@atlassiansox/product-store-react@0.5.1) (2019-09-26)

### Bug Fixes

- **product-store-react:** removing usage of origin and adding pollingThreshold for product-store-rea ([162a30a](https://bitbucket.org/atlassian/growth-kit/commits/162a30a))

# [0.5.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.5.0) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Features

- add appName to SpaParentClient instantiations ([f0c23c6](https://bitbucket.org/atlassian/growth-kit/commits/f0c23c6))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

# [0.4.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.4.0) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Features

- add appName to SpaParentClient instantiations ([f0c23c6](https://bitbucket.org/atlassian/growth-kit/commits/f0c23c6))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

# [0.3.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.3.0) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Features

- add appName to SpaParentClient instantiations ([f0c23c6](https://bitbucket.org/atlassian/growth-kit/commits/f0c23c6))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

# [0.2.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.2.0) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Features

- add appName to SpaParentClient instantiations ([f0c23c6](https://bitbucket.org/atlassian/growth-kit/commits/f0c23c6))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.40](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.40) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.39](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.39) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.38](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.38) (2019-09-26)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.37](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.37) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.36](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.36) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.35](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.35) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.34](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.34) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))
- **product-store:** fixing stories in IE11 ([9c2ee63](https://bitbucket.org/atlassian/growth-kit/commits/9c2ee63))
- **product-store-react:** adding url-polyfill ([49e785f](https://bitbucket.org/atlassian/growth-kit/commits/49e785f))

### Performance Improvements

- **product-store-react:** broadening dep rage ([9fbeb3c](https://bitbucket.org/atlassian/growth-kit/commits/9fbeb3c))

## [0.1.33](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.33) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.32](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.32) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.31](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.31) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.30](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.30) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.29](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.29) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.28](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.28) (2019-09-25)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.27](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.27) (2019-09-24)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.26](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.26) (2019-09-24)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.25](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.25) (2019-09-23)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.24](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.24) (2019-09-23)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.23](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.23) (2019-09-23)

### Bug Fixes

- fix bamboo by manually updating plugin version number cont'd ([cbd6f08](https://bitbucket.org/atlassian/growth-kit/commits/cbd6f08))
- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.21](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.21) (2019-09-19)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.20](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.20) (2019-09-19)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.19](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.19) (2019-09-19)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.18](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.18) (2019-09-19)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.17](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.17) (2019-09-18)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.16](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.16) (2019-09-18)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.15](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.15) (2019-09-18)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.14](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.14) (2019-09-18)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.13](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.13) (2019-09-18)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.12](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.12) (2019-09-17)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.11](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.11) (2019-09-17)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.10](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.10) (2019-09-17)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.9) (2019-09-17)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.8) (2019-09-17)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.7) (2019-09-16)

### Bug Fixes

- fix package main ([1e22eb5](https://bitbucket.org/atlassian/growth-kit/commits/1e22eb5))
- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.6) (2019-09-16)

### Bug Fixes

- set compilation target to es5 and module to commonjs ([676e90d](https://bitbucket.org/atlassian/growth-kit/commits/676e90d))

## [0.1.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.4...@atlassiansox/product-store-react@0.1.5) (2019-09-16)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.1.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.3...@atlassiansox/product-store-react@0.1.4) (2019-09-12)

### Bug Fixes

- **product-store-react:** invoking onChangeRoute when CHANGE_ROUTE event is triggered in the client ([7964bbc](https://bitbucket.org/atlassian/growth-kit/commits/7964bbc))

## [0.1.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.2...@atlassiansox/product-store-react@0.1.3) (2019-09-09)

**Note:** Version bump only for package @atlassiansox/product-store-react

## [0.1.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.1...@atlassiansox/product-store-react@0.1.2) (2019-09-09)

### Bug Fixes

- **product-store-react:** add iframe-plugin as a dependency ([fd00312](https://bitbucket.org/atlassian/growth-kit/commits/fd00312))

## [0.1.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/product-store-react@0.1.0...@atlassiansox/product-store-react@0.1.1) (2019-09-06)

### Bug Fixes

- **product-store-react:** export module to translate productKeys in routes ([fd4b350](https://bitbucket.org/atlassian/growth-kit/commits/fd4b350))

# 0.1.0 (2019-09-05)

### Bug Fixes

- **product-store-react:** fix integration with product-store-spa ([86822a2](https://bitbucket.org/atlassian/growth-kit/commits/86822a2))
- **product-store-react:** fix paths inside of tsconfig.build.json ([6e26bf2](https://bitbucket.org/atlassian/growth-kit/commits/6e26bf2))
- **product-store-react:** Remove script to run the tests in jest ([521e776](https://bitbucket.org/atlassian/growth-kit/commits/521e776))
- **product-store-react:** translate productKey to route ([e7bd6f7](https://bitbucket.org/atlassian/growth-kit/commits/e7bd6f7))

### Features

- **product-store-react:** Add 'LEARN_MORE' and 'TRY' handlers ([194aec4](https://bitbucket.org/atlassian/growth-kit/commits/194aec4))
- **product-store-react:** create RoutesEnum ([bad9226](https://bitbucket.org/atlassian/growth-kit/commits/bad9226))
- **product-store-react:** dispatch CHANGE_ROUTE ([f9ebe3d](https://bitbucket.org/atlassian/growth-kit/commits/f9ebe3d))
