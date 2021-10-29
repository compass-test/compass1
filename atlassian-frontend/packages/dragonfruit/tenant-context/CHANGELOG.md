# @atlassian/dragonfruit-tenant-context

## 2.5.4

### Patch Changes

- [`80a389959de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80a389959de) - Fix the build tsconfig.json to properly exclude tests and examples to be built when running yarn build --types.

## 2.5.3

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 2.5.2

### Patch Changes

- [`623870acdb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/623870acdb2) - [ux] Add instructions to managed by card to contact an admin to configure the Bitbucket integration.

## 2.5.1

### Patch Changes

- [`82c472d0260`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82c472d0260) - Modified the navigation profile popup menu to have account settings, and user's full name

## 2.5.0

### Minor Changes

- [`3ee1da49d97`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ee1da49d97) - Adds name and email to useGetAccountInfo. Adds name and email to feedback collector submissions.

## 2.4.3

### Patch Changes

- [`49d40f272d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/49d40f272d8) - Make tsconfig files consistent

## 2.4.2

### Patch Changes

- [`9024fe20f59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9024fe20f59) - Adding feature flags package.

## 2.4.1

### Patch Changes

- [`3dd76346112`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3dd76346112) - Remove unused Permission.READ enum variant

## 2.4.0

### Minor Changes

- [`a35b028b9a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a35b028b9a0) - added permission handling

### Patch Changes

- Updated dependencies

## 2.3.0

### Minor Changes

- [`6811830a1a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6811830a1a2) - COMPASS-936 COMPASS-937 refactored tenantInfo and accountInfo

## 2.2.5

### Patch Changes

- [`b695d84c8d9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b695d84c8d9) - Built ARI from component ID

## 2.2.4

### Patch Changes

- [`8a586d5d53a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a586d5d53a) - Add workspaceId and permissions to tenantInfo

## 2.2.3

### Patch Changes

- Updated dependencies

## 2.2.2

### Patch Changes

- [`d5da2d40e8a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5da2d40e8a) - Added wrapper functions to localStorage

## 2.2.1

### Patch Changes

- [`79311758242`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79311758242) - Add integration tests to compass component details page

## 2.2.0

### Minor Changes

- [`78783c6bcde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78783c6bcde) - Added test coverage for get-account-info service

## 2.1.3

### Patch Changes

- [`08f08e6f354`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08f08e6f354) - Update packages ownership, and teams members.

## 2.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.1.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.1.0

### Minor Changes

- [`b7d1bd9e27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7d1bd9e27) - [ux] Add profile menu and placeholder search bar to top navigation

## 2.0.0

### Major Changes

- [`8258d08064`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8258d08064) - Added tenant context package.
