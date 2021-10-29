# @af/compass-search-cache

## 0.6.7

### Patch Changes

- Updated dependencies

## 0.6.6

### Patch Changes

- Updated dependencies

## 0.6.5

### Patch Changes

- [`885293a2279`](https://bitbucket.org/atlassian/atlassian-frontend/commits/885293a2279) - Removed teams v3 ff

## 0.6.4

### Patch Changes

- Updated dependencies

## 0.6.3

### Patch Changes

- Updated dependencies

## 0.6.2

### Patch Changes

- [`100a2b6d3c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/100a2b6d3c2) - Added support for teams V3 API behind feature flag
- Updated dependencies

## 0.6.1

### Patch Changes

- [`d1edc2768e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1edc2768e4) - Centralized teams api calls into dragonfruit-rest package
- Updated dependencies

## 0.6.0

### Minor Changes

- [`a37f85e21ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a37f85e21ef) - [ux] Added the default state in compass search flyout. It shows upto last 10 components accessed by the user

## 0.5.1

### Patch Changes

- [`80a389959de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80a389959de) - Fix the build tsconfig.json to properly exclude tests and examples to be built when running yarn build --types.

## 0.5.0

### Minor Changes

- [`e586a833ed8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e586a833ed8) - Added listener on component details page so that a component is added to recent components when component is visited

## 0.4.1

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.4.0

### Minor Changes

- [`f3135c43a6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3135c43a6a) - Use single GQL query to hydrate cached components

## 0.3.0

### Minor Changes

- [`71930ebf15a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71930ebf15a) - Revert PR 13219

## 0.2.0

### Minor Changes

- [`c1128115b24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1128115b24) - Adds listeners for CompassRecentsCache to component and team detail pages.

## 0.1.0

### Minor Changes

- [`17729e88161`](https://bitbucket.org/atlassian/atlassian-frontend/commits/17729e88161) - Add search-cache package and remove recents client from search-dialog package.

## 0.0.4

### Patch Changes

- [`229b32842b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/229b32842b5) - Fix .npmignore and tsconfig.json for **tests**

## 0.0.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.0.1

### Patch Changes

- [`b443b5a60f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b443b5a60f) - Renamed template package
