# Change Log

## 2.0.0

### Major Changes

- [`084b4ef4871`](https://bitbucket.org/atlassian/atlassian-frontend/commits/084b4ef4871) - Remove support for enabling Xflow UI in Cross Flow Support

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

## 0.30.7

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.30.6

### Patch Changes

- [`f86c8aa9f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f86c8aa9f8) - Integrate support for CrossFlowExtensions

## 0.30.5

### Patch Changes

- Updated dependencies

## 0.30.4

### Patch Changes

- [`594e30ba83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/594e30ba83) - move env and journey prop typing to CrossFlowParams (moving typings only)

## 0.30.3

### Patch Changes

- [`eb31f635ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb31f635ab) - Cross Flow Support should pass extra parameters (journey, env) to Cross Flow SPAs

## 0.30.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.30.1

### Patch Changes

- Updated dependencies

## 0.30.0

### Minor Changes

- [`2079e1f96a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2079e1f96a) - issue CROSSFLOW-567 add the JIRA_FAMILY value of 'jira' as a valid CrossFlowOriginProduct

## 0.29.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.28.11

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 0.28.10

### Patch Changes

- [`bc5036d662`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc5036d662) - Publish to include new version of cross-flow-plugins

## 0.28.9

### Patch Changes

- [`f434c875a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f434c875a7) - Introduced @atlassiansox/cross-flow-react into atlassian-frontend

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.28.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.7...@atlassiansox/cross-flow-react@0.28.8) (2020-06-18)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.28.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.6...@atlassiansox/cross-flow-react@0.28.7) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.28.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.5...@atlassiansox/cross-flow-react@0.28.6) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.28.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.4...@atlassiansox/cross-flow-react@0.28.5) (2020-06-16)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.28.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.3...@atlassiansox/cross-flow-react@0.28.4) (2020-06-12)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.28.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.2...@atlassiansox/cross-flow-react@0.28.3) (2020-06-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.28.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.1...@atlassiansox/cross-flow-react@0.28.2) (2020-06-03)

### Bug Fixes

- move handling of experimental options to spa side ([7427e6d](https://bitbucket.org/atlassian/growth-kit/commits/7427e6d))

## [0.28.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.28.0...@atlassiansox/cross-flow-react@0.28.1) (2020-06-02)

### Bug Fixes

- improve type interfaces for plugins in cross-flow-support and cross-flow-react ([e718fc5](https://bitbucket.org/atlassian/growth-kit/commits/e718fc5))

# [0.28.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.27.1...@atlassiansox/cross-flow-react@0.28.0) (2020-06-01)

### Bug Fixes

- fix serialisation issue with contextInfo in cross-flow-react, handle JSON parsing errors consit ([db62c7b](https://bitbucket.org/atlassian/growth-kit/commits/db62c7b))
- fixes bug where experimentalOptions was incorrectly serialised when sent as a query param to cr ([5446dda](https://bitbucket.org/atlassian/growth-kit/commits/5446dda))

### Features

- pass through expansion props to support WAC expands in cross-flow-react ([62f45ce](https://bitbucket.org/atlassian/growth-kit/commits/62f45ce))
- pR feedback - leverage experimentalOptions for WAC expansion props ([a0312a7](https://bitbucket.org/atlassian/growth-kit/commits/a0312a7))

## [0.27.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.27.0...@atlassiansox/cross-flow-react@0.27.1) (2020-05-29)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

# [0.27.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.26.1...@atlassiansox/cross-flow-react@0.27.0) (2020-05-08)

### Bug Fixes

- redefine JSONValue and JSONArray types for better Flow/Typescript compatibility ([411947f](https://bitbucket.org/atlassian/growth-kit/commits/411947f))

### Features

- add support for experimentalOptions to cross-flow-support ([cc11a66](https://bitbucket.org/atlassian/growth-kit/commits/cc11a66))

## [0.26.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.26.0...@atlassiansox/cross-flow-react@0.26.1) (2020-05-05)

### Bug Fixes

- **cross-flow-support:** update cross-flow-react and product-store-react to initialise after onAnaly ([1c204f3](https://bitbucket.org/atlassian/growth-kit/commits/1c204f3))

# [0.26.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.9...@atlassiansox/cross-flow-react@0.26.0) (2020-05-04)

### Features

- add plugins as a prop to the CrossFlowIntegration in cross-flow-react ([3be297f](https://bitbucket.org/atlassian/growth-kit/commits/3be297f))

## [0.25.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.8...@atlassiansox/cross-flow-react@0.25.9) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.7...@atlassiansox/cross-flow-react@0.25.8) (2020-05-04)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.6...@atlassiansox/cross-flow-react@0.25.7) (2020-05-01)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.5...@atlassiansox/cross-flow-react@0.25.6) (2020-04-29)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.4...@atlassiansox/cross-flow-react@0.25.5) (2020-04-24)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.3...@atlassiansox/cross-flow-react@0.25.4) (2020-04-23)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.2...@atlassiansox/cross-flow-react@0.25.3) (2020-04-17)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.1...@atlassiansox/cross-flow-react@0.25.2) (2020-04-15)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.25.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.25.0...@atlassiansox/cross-flow-react@0.25.1) (2020-04-15)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

# [0.25.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.24.2...@atlassiansox/cross-flow-react@0.25.0) (2020-04-14)

### Features

- **cross-flow-spa:** Replace ProductKey enum with OriginProduct enum for originProduct prop ([05e449b](https://bitbucket.org/atlassian/growth-kit/commits/05e449b))

## [0.24.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.24.1...@atlassiansox/cross-flow-react@0.24.2) (2020-04-09)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.24.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.24.0...@atlassiansox/cross-flow-react@0.24.1) (2020-03-26)

### Bug Fixes

- override modal/loader elements from cross-flow-react, minor fixes ([73e8c54](https://bitbucket.org/atlassian/growth-kit/commits/73e8c54))

# [0.24.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.9...@atlassiansox/cross-flow-react@0.24.0) (2020-02-27)

### Features

- make originProduct compulsory across cross-flow-frontend and cross-flow-react ([e11c791](https://bitbucket.org/atlassian/growth-kit/commits/e11c791))

## [0.23.9](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.8...@atlassiansox/cross-flow-react@0.23.9) (2020-02-20)

### Bug Fixes

- **cross-flow-react:** update src to include trailing forward slash to preserve query ([e8607a8](https://bitbucket.org/atlassian/growth-kit/commits/e8607a8))

## [0.23.8](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.7...@atlassiansox/cross-flow-react@0.23.8) (2020-02-20)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.23.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.6...@atlassiansox/cross-flow-react@0.23.7) (2020-02-19)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.23.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.5...@atlassiansox/cross-flow-react@0.23.6) (2020-02-17)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.23.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.4...@atlassiansox/cross-flow-react@0.23.5) (2020-02-13)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.23.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.3...@atlassiansox/cross-flow-react@0.23.4) (2020-02-13)

### Bug Fixes

- remove final left over exhaustive deps changes ([b0b5a9b](https://bitbucket.org/atlassian/growth-kit/commits/b0b5a9b))
- remove unnecessary nested eslintrc config files ([bd84cce](https://bitbucket.org/atlassian/growth-kit/commits/bd84cce))

## [0.23.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.2...@atlassiansox/cross-flow-react@0.23.3) (2020-02-13)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.23.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.1...@atlassiansox/cross-flow-react@0.23.2) (2020-02-12)

**Note:** Version bump only for package @atlassiansox/cross-flow-react

## [0.23.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.23.0...@atlassiansox/cross-flow-react@0.23.1) (2020-02-12)

### Bug Fixes

- introduce react-hooks eslint rules and update files as necessary ([869144c](https://bitbucket.org/atlassian/growth-kit/commits/869144c))

# [0.23.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.22.0...@atlassiansox/cross-flow-react@0.23.0) (2020-01-23)

### Features

- rename suggestedSiteName prop to be plural ([8c0120a](https://bitbucket.org/atlassian/growth-kit/commits/8c0120a))

# [0.22.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.22.0) (2020-01-23)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.21.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.21.0) (2020-01-23)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.20.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.20.0) (2020-01-23)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.19.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.19.0) (2020-01-23)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.18.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.18.0) (2020-01-23)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.17.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.17.0) (2020-01-23)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.16.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.16.0) (2020-01-22)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))
- limit suggestedSiteName to 5 values and handle errors ([4a70c73](https://bitbucket.org/atlassian/growth-kit/commits/4a70c73))
- re-add missing module declarations ([3849a34](https://bitbucket.org/atlassian/growth-kit/commits/3849a34))
- remove query-string version bump to support IE ([a61045e](https://bitbucket.org/atlassian/growth-kit/commits/a61045e))
- update query-string to use comma seperators for suggestedSiteName and remove module declare ([e12a169](https://bitbucket.org/atlassian/growth-kit/commits/e12a169))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))
- **cross-flow-react:** add array type to suggestedSiteName and integrate ([2a00873](https://bitbucket.org/atlassian/growth-kit/commits/2a00873))
- merge master to fix conflicts ([c7ce0ab](https://bitbucket.org/atlassian/growth-kit/commits/c7ce0ab))

# [0.15.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.15.0) (2020-01-22)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.14.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.14.0) (2020-01-22)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.13.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.13.0) (2020-01-22)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.12.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.12.0) (2020-01-22)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.11.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.11.0) (2020-01-21)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.10.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.10.0) (2020-01-21)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.9.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.9.0) (2020-01-21)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.8.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.8.0) (2020-01-20)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.7.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.7.0) (2020-01-20)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.6.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.6.0) (2020-01-20)

### Bug Fixes

- export editions from cross-flow-react package for use in integration ([d744f81](https://bitbucket.org/atlassian/growth-kit/commits/d744f81))
- **cross-flow-react:** trigger build on merge of type changes ([8cb7271](https://bitbucket.org/atlassian/growth-kit/commits/8cb7271))
- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

# [0.5.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.5.0) (2020-01-20)

### Bug Fixes

- **cross-flow-react:** use local modules for cross-flow integration components ([9aff8e7](https://bitbucket.org/atlassian/growth-kit/commits/9aff8e7))

### Features

- add onClose callback to integration component api ([e5628d1](https://bitbucket.org/atlassian/growth-kit/commits/e5628d1))

## [0.4.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-react@0.4.0...@atlassiansox/cross-flow-react@0.4.1) (2020-01-20)

**Note:** Version bump only for package @atlassiansox/cross-flow-react
