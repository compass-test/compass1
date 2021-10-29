# @atlaskit/synchrony-test-helpers

## 2.3.12

### Patch Changes

- [`b90c0237824`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b90c0237824) - Update package.jsons to remove unused dependencies.
- Updated dependencies

## 2.3.11

### Patch Changes

- Updated dependencies

## 2.3.10

### Patch Changes

- Updated dependencies

## 2.3.9

### Patch Changes

- Updated dependencies

## 2.3.8

### Patch Changes

- Updated dependencies

## 2.3.7

### Patch Changes

- Updated dependencies

## 2.3.6

### Patch Changes

- Updated dependencies

## 2.3.5

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.3.4

### Patch Changes

- Updated dependencies

## 2.3.3

### Patch Changes

- [`703752d487`](https://bitbucket.org/atlassian/atlassian-frontend/commits/703752d487) - ED-10647 Remove caret from prosemirror-model, prosemirror-keymap, prosemirror-state, prosemirror-transform to lock them down to an explicit version
- Updated dependencies

## 2.3.2

### Patch Changes

- [`c709b5e800`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c709b5e800) - Fixing Denial Of Service (DoS) vulnerability found in node-fetch - bump node fetch 2.6.1.

  - Bump `node-fetch` to 2.6.1 - we were already resolving to 2.6.0
  - Run `yarn-deduplicate --packages node-fetch` in all 4 yarn.lock
  - Bump `cross-fetch` to 3.0.6 that has the latest version of `node-fetch`
  - Run `yarn-deduplicate --packages cross-fetch`
  - Bump `jest-fetch-mock` to 3.0.3 that has the latest version of node-fetch

  Unfortunately due to styled-components bring `fbjs` and an old version of `node-fetch` we had to force the resolutions in lot of places.

## 2.3.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.3.0

### Minor Changes

- [`9a39500244`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a39500244) - Bump ProseMirror packages

  Read more: https://product-fabric.atlassian.net/wiki/spaces/E/pages/1671956531/2020-08

### Patch Changes

- Updated dependencies

## 2.2.3

### Patch Changes

- [`351c595fbb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/351c595fbb) - ED-9999: Fixes an issue where the collab provider would blindly remove all listeners instead of only its local ones.
- Updated dependencies

## 2.2.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.2.1

### Patch Changes

- Updated dependencies

## 2.2.0

### Minor Changes

- [`721551246f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/721551246f) - Add Synchrony to steps package

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [`3e0488d4cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e0488d4cb) - Connect to Synchrony automatically if possible

## 2.0.1

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [`2b36b3f112`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b36b3f112) - add participant helper for collaborative editing

### Patch Changes

- [`539c5f451b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/539c5f451b) - chore: upgrade to latest prosemirror-synchrony-plugin
- Updated dependencies

## 1.1.0

### Minor Changes

- [`32290edc3e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32290edc3e) - ED-9169 feat: expose synchrony feature flags

### Patch Changes

- [`56a7357c81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56a7357c81) - ED-9197: upgrade prosemirror-transform to prevent cut and paste type errors

  It's important to make sure that there isn't any `prosemirror-transform` packages with version less than 1.2.5 in `yarn.lock`.- Updated dependencies

## 1.0.6

### Patch Changes

- Updated dependencies [c74cc954d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/c74cc954d8):
- Updated dependencies [b4326a7eba](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4326a7eba):
- Updated dependencies [e4076915c8](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4076915c8):
- Updated dependencies [05539b052e](https://bitbucket.org/atlassian/atlassian-frontend/commits/05539b052e):
- Updated dependencies [205b05851a](https://bitbucket.org/atlassian/atlassian-frontend/commits/205b05851a):
- Updated dependencies [0b22d3b9ea](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b22d3b9ea):
- Updated dependencies [b4ef7fe214](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4ef7fe214):
- Updated dependencies [67bc25bc3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/67bc25bc3f):
- Updated dependencies [6eb8c0799f](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb8c0799f):
  - @atlaskit/editor-common@45.0.0

## 1.0.5

### Patch Changes

- [patch][5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):

  ED-8822: promote internal packages from peer to automatically installed dependencies- Updated dependencies [bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):

- Updated dependencies [5bb23adac3](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bb23adac3):
- Updated dependencies [025842de1a](https://bitbucket.org/atlassian/atlassian-frontend/commits/025842de1a):
- Updated dependencies [395739b5ef](https://bitbucket.org/atlassian/atlassian-frontend/commits/395739b5ef):
  - @atlaskit/editor-common@44.0.2

## 1.0.4

### Patch Changes

- [patch][8183f7c8da](https://bitbucket.org/atlassian/atlassian-frontend/commits/8183f7c8da):

  Remove Karma tests - based on AFP-960- Updated dependencies [9e90cb4336](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e90cb4336):

- Updated dependencies [151240fce9](https://bitbucket.org/atlassian/atlassian-frontend/commits/151240fce9):
- Updated dependencies [8d09cd0408](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d09cd0408):
- Updated dependencies [088f4f7d1e](https://bitbucket.org/atlassian/atlassian-frontend/commits/088f4f7d1e):
- Updated dependencies [8183f7c8da](https://bitbucket.org/atlassian/atlassian-frontend/commits/8183f7c8da):
- Updated dependencies [79cabaee0c](https://bitbucket.org/atlassian/atlassian-frontend/commits/79cabaee0c):
- Updated dependencies [ded54f7b9f](https://bitbucket.org/atlassian/atlassian-frontend/commits/ded54f7b9f):
- Updated dependencies [e3a8052151](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3a8052151):
- Updated dependencies [02b2a2079c](https://bitbucket.org/atlassian/atlassian-frontend/commits/02b2a2079c):
  - @atlaskit/editor-common@44.0.0

## 1.0.3

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/editor-common@43.4.1

## 1.0.2

### Patch Changes

- Updated dependencies [271945fd08](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/271945fd08):
- Updated dependencies [ea0e619cc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea0e619cc7):
- Updated dependencies [bb164fbd1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb164fbd1e):
- Updated dependencies [10425b84b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10425b84b4):
- Updated dependencies [4700477bbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4700477bbe):
- Updated dependencies [926798632e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926798632e):
  - @atlaskit/editor-common@43.0.0

## 1.0.1

### Patch Changes

- [patch][c20e926a6c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c20e926a6c):

  ED-7971: fix deleting of nested task lists

  Upgrades prosemirror-view to 1.1.6.

  See (this discussion)[https://discuss.prosemirror.net/t/collapsing-empty-nodes-on-delete/2306/4] for more details and screenshots of the behaviour it fixes.

- Updated dependencies [70e1055b8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/70e1055b8f):
  - @atlaskit/editor-common@42.0.0
