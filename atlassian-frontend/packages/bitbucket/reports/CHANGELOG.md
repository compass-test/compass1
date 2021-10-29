# @atlassian/bitbucket-reports

## 0.8.1

### Patch Changes

- Updated dependencies

## 0.8.0

### Minor Changes

- [`58a7e04e562`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58a7e04e562) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer to be on the right instead of the left.

### Patch Changes

- Updated dependencies

## 0.7.14

### Patch Changes

- Updated dependencies

## 0.7.13

### Patch Changes

- [`414b6216adf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/414b6216adf) - Upgrade date-fns to ^2.17

## 0.7.12

### Patch Changes

- [`fa64b3d94e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa64b3d94e5) - Update internal component usage
- Updated dependencies

## 0.7.11

### Patch Changes

- [`c119fdd32e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c119fdd32e7) - Internal change to update usage of the custom `glyph` prop in @atlaskit/icon.
- Updated dependencies

## 0.7.10

### Patch Changes

- [`471e2431a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/471e2431a7c) - Downgrade back to date-fns 1.30.1
  We discovered big bundle size increases associated with the date-fns upgrade.
  We're reverting the upgarde to investigate

## 0.7.9

### Patch Changes

- [`70f0701c2e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70f0701c2e6) - Upgrade date-fns to 2.17

## 0.7.8

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.7.7

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.7.6

### Patch Changes

- [`aa71ced620`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa71ced620) - Add missing analytics-next dependency
- Updated dependencies

## 0.7.5

### Patch Changes

- Updated dependencies

## 0.7.4

### Patch Changes

- Updated dependencies

## 0.7.3

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.7.2

### Patch Changes

- [`f502d2951c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f502d2951c) - Update outdated annotations dialog title

## 0.7.1

### Patch Changes

- [`2d3dd62bd8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d3dd62bd8) - Update outdated annotations copy

## 0.7.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.6.1

### Patch Changes

- [`525b1b0a63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/525b1b0a63) - Show PR annotations as default

## 0.6.0

### Minor Changes

- [`233e12cf31`](https://bitbucket.org/atlassian/atlassian-frontend/commits/233e12cf31) - Add outdated annotations modal dialog.

## 0.5.0

### Minor Changes

- [`20cf017725`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20cf017725) - Performance improvements

## 0.4.0

### Minor Changes

- [`2f0374cff7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f0374cff7) - Ability to toggle current PR annotations in the dialog

## 0.3.0

### Minor Changes

- [`2dbf9f4546`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2dbf9f4546) - Update analytic events and empty states

## 0.2.0

### Minor Changes

- [`f77da34895`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f77da34895) - Initial reports package

## 0.1.0

- [major] Initial version
