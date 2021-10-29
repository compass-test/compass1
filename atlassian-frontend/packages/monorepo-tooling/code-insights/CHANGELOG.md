# @atlaskit/code-insights

## 1.1.18

### Patch Changes

- [`84270dcf31a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84270dcf31a) - Bump dependency "meow" to version ^6.0.0

## 1.1.17

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.1.16

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.1.15

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.1.14

### Patch Changes

- [`048a5403e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/048a5403e0) - Add keep-alive to fetch in code-insights to fix failing BBServer requests

## 1.1.13

### Patch Changes

- [patch][6a2489c6d7](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a2489c6d7):

  Only send code-insights annotations when there are some

## 1.1.12

### Patch Changes

- [patch][a1bc1e6637](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1bc1e6637):

  AFP-1437: Fix vulnerability issue for url-parse and bump to ^1.4.5.Packages.

## 1.1.11

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 1.1.10

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 1.1.9

### Patch Changes

- [patch][f5a3c7e7b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5a3c7e7b9):

  CLI's should return a non-zero return code when a error was thrown

## 1.1.8

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 1.1.7

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 1.1.6

### Patch Changes

- [patch][8a30920bec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a30920bec):

  Fix false positives for duplicate dependencies in code-insights.

## 1.1.5

### Patch Changes

- [patch][90de42e3ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90de42e3ac):

  Change the code-insights tool to compare the duplicates of the latest commit with the branch of point with master. Instead of the current behaviour of comparing branch with origin/master.

## 1.1.4

### Patch Changes

- [patch][a7e403fc68](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a7e403fc68):

  @types/node-fetch was declared in devDependencies and dependencies. Move @types/node-fetch, @types/node, @types/url-parse from dependencies to devDependencies.

## 1.1.3

- [patch][0a4ccaafae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a4ccaafae):

  - Bump tslib

## 1.1.2

- [patch][96d9e78615](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/96d9e78615):

  - Fix flawed targetbranch logic

## 1.1.1

- [patch][d3d376241a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3d376241a):

  - Creating a patch for the readme chagne

## 1.1.0

- [minor][f782c6a37d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f782c6a37d):

  - Add basicAuth support for bitbucket-server reporter

## 1.0.1

- [patch][353aa4a2dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/353aa4a2dd):

  - Fix bin directory in package.json

## 1.0.0

- [major][dc294c47bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc294c47bb):

  - Release first version of code-insights tool

## 0.0.3

- [patch][ff246f306c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ff246f306c):

  - Fixed some bugs

## 0.0.2

- [patch][7a1316f335](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a1316f335):

  - First version of beautiful insights
