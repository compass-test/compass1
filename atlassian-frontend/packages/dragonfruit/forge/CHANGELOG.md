# @atlassian/dragonfruit-forge

## 0.7.0

### Minor Changes

- [`e488d446b8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e488d446b8f) - Added new extension context types for compass, and added url to the custom UI admin extension point

## 0.6.4

### Patch Changes

- [`20564d710a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20564d710a7) - [ux] refactored apps page to remove hard-coding of extension keys for published apps
- Updated dependencies

## 0.6.3

### Patch Changes

- Updated dependencies

## 0.6.2

### Patch Changes

- [`b1b864a007e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1b864a007e) - [ux] expanding apps queries to allow for uninstalling forge apps outside of production

## 0.6.1

### Patch Changes

- [`6186ce1a034`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6186ce1a034) - [ux] Added support for custom UI on admin pages
- Updated dependencies

## 0.6.0

### Minor Changes

- [`c71544edf9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c71544edf9c) - [ux] Add config-as-code setup instructions to component settings

## 0.5.0

### Minor Changes

- [`da51520c568`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da51520c568) - Added forge provider analytics to the admin extension point

## 0.4.0

### Minor Changes

- [`97f7ea66ad1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97f7ea66ad1) - add get app service and change text on buttons

## 0.3.0

### Minor Changes

- [`7df5e3fa3c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df5e3fa3c1) - moved app services to common location, add data manager sub header

## 0.2.3

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- [`80a389959de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80a389959de) - Fix the build tsconfig.json to properly exclude tests and examples to be built when running yarn build --types.

## 0.2.1

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.2.0

### Minor Changes

- [`dd686626dbb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd686626dbb) - [ux] Added a component details page extension point

### Patch Changes

- Updated dependencies

## 0.1.4

### Patch Changes

- Updated dependencies

## 0.1.3

### Patch Changes

- Updated dependencies

## 0.1.2

### Patch Changes

- [`49d40f272d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/49d40f272d8) - Make tsconfig files consistent

## 0.1.1

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`2d45c14d048`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d45c14d048) - [ux] The configuration page now has a special extension point that passes through the url of the page. This is necessary for allowing forge apps to redirect back to this page if they require external configuration, like bitbucket.

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
