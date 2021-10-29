# @atlassian/aux-test-utils

## 4.1.2

### Patch Changes

- Updated dependencies

## 4.1.1

### Patch Changes

- Updated dependencies

## 4.1.0

### Minor Changes

- [`155a3ea7116`](https://bitbucket.org/atlassian/atlassian-frontend/commits/155a3ea7116) - Add Renderer storybook helper functions.

### Patch Changes

- Updated dependencies

## 4.0.10

### Patch Changes

- [`25de4859c71`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25de4859c71) - Moves createMockHandler to package from forge-ui

## 4.0.9

### Patch Changes

- Updated dependencies

## 4.0.8

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 4.0.7

### Patch Changes

- Updated dependencies

## 4.0.6

### Patch Changes

- [`29b9963ac8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29b9963ac8) - Update publishConfig registry URL

## 4.0.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 4.0.4

### Patch Changes

- [`8004795d40`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8004795d40) - Updated Metal client

## 4.0.3

### Patch Changes

- [`4ca8902178`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ca8902178) - Minor build config change - no effect on consumers

## 4.0.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 4.0.1

### Patch Changes

- Updated dependencies

## 4.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 3.3.7

### Patch Changes

- [`f460c7eb57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f460c7eb57) - Update temporarilySilenceActAndAtlaskitDeprecationWarnings to override console error and warn immediately

## 3.3.6

### Patch Changes

- Updated dependencies

## 3.3.5

### Patch Changes

- [`246fe8e9f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/246fe8e9f3) - Upgraded @atlassiansox/metal-client from ^1.17.2 to ^1.18.0

## 3.3.4

### Patch Changes

- Updated dependencies

## 3.3.3

### Patch Changes

- Updated dependencies

## 3.3.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 3.3.1

### Patch Changes

- Updated dependencies

## 3.3.0

### Minor Changes

- [`1d308ce57d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d308ce57d) - Added getHasBeenCalledPromise

## 3.2.1

### Patch Changes

- [`a016cf9a28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a016cf9a28) - Rename variables, remove tests & refactor inner workings of components

## 3.2.0

### Minor Changes

- [`3d47feacce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d47feacce) - Add createMockMetalClient function

### Patch Changes

- Updated dependencies

## 3.1.3

### Patch Changes

- Updated dependencies [9809d6e322](https://bitbucket.org/atlassian/atlassian-frontend/commits/9809d6e322):
  - @atlassian/forge-ui-types@16.0.0

## 3.1.2

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/mention@18.16.2

## 3.1.1

### Patch Changes

- [patch][b54a759c3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/b54a759c3f):

  Add aux-test-utils and forge-ui-validator to atlassian-frontend monorepo.

## 3.1.0

### Minor Changes

- [minor][3bf66617](https://bitbucket.org/atlassian/aux/commits/3bf66617):

  Add temporarilyMockPerformanceAPI to appease tests which fail because performance.mark is not defined

### Patch Changes

- Updated dependencies [577453ed](https://bitbucket.org/atlassian/aux/commits/577453ed):
  - @atlassian/forge-ui-types@15.0.0

## 3.0.5

### Patch Changes

- [patch][9dfdeca5](https://bitbucket.org/atlassian/aux/commits/9dfdeca5):

  Render portals above modals. Move ProductDataProvider within ForgeExtension. Add key to UserPicker. transformFormData in ConfigForm- Updated dependencies [9dfdeca5](https://bitbucket.org/atlassian/aux/commits/9dfdeca5):

- Updated dependencies [00303db7](https://bitbucket.org/atlassian/aux/commits/00303db7):
  - @atlassian/forge-ui-types@14.4.2

## 3.0.4

### Patch Changes

- [patch][1d8af3c8](https://bitbucket.org/atlassian/aux/commits/1d8af3c8):

  Create new forge-ui-core package and move components, renderer, analytics and context into it.

## 3.0.3

### Patch Changes

- [patch][3ae99cc7](https://bitbucket.org/atlassian/aux/commits/3ae99cc7):

  Bumped TS version to 3.6.4 and upgraded some AK dependencies

## 3.0.2

### Patch Changes

- [patch][159be71c](https://bitbucket.org/atlassian/aux/commits/159be71c):

  Add forge:src field to package.json

## 3.0.1

### Patch Changes

- [patch][d22e0ea5](https://bitbucket.org/atlassian/aux/commits/d22e0ea5):

  Add tsconfig and npmignore

## 3.0.0

### Major Changes

- [major][51b3988](https://bitbucket.org/atlassian/aux/commits/51b3988):

  Introduce cjs as main and module now points to esm build

## 2.0.2

### Patch Changes

- [patch][1c40eff](https://bitbucket.org/atlassian/aux/commits/1c40eff):

  Set main field module to es5 for Confluence

## 2.0.1

### Patch Changes

- [patch][02ffbb1](https://bitbucket.org/atlassian/aux/commits/02ffbb1):

  Bump to new typescript version
