# @atlassian/analytics-bridge

## 0.4.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.4.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.4.2

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.4.0

### Minor Changes

- [`e71a3dc102`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e71a3dc102) - Changing analytics-bridge channel name so it does not conflict with one in Jira

## 0.3.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.2.1

### Patch Changes

- [`521ab057bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/521ab057bb) - Changed to use full lodash instead of mini-lodash so other repos can de-dupe it

## 0.2.0

### Minor Changes

- [`672de79721`](https://bitbucket.org/atlassian/atlassian-frontend/commits/672de79721) - Fix bug where react children are passed to the analytics context data

## 0.1.4

### Patch Changes

- [patch][7b86438e5f](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b86438e5f):

  Introduce error handling and expose AnalyticsAttributes from analytics-bridge

## 0.1.3

### Patch Changes

- [patch][fc3ff87b2e](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc3ff87b2e):

  Exposed index files so package can be consumed properly

## 0.1.2

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/analytics-next@6.3.5

## 0.1.1

### Patch Changes

- [patch][03f62165fb](https://bitbucket.org/atlassian/atlassian-frontend/commits/03f62165fb):

  Bump "lodash.merge" to "^4.6.2".

## 0.1.0

### Minor Changes

- [minor][b0c0ad5ef7](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0c0ad5ef7):

  Initial release
