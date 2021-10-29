# @atlaskit/codemod-cli

## 0.8.0

### Minor Changes

- [`f3d46c395b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3d46c395b4) - Add path filtering to codemod-cli

## 0.7.0

### Minor Changes

- [`d3a285fdc82`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3a285fdc82) - Add support for codemods authored as .tsx files

## 0.6.7

### Patch Changes

- [`4a67fb592c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a67fb592c8) - Bump jscodeshift to 0.13.0.
  [Commit Changelog](https://github.com/facebook/jscodeshift/commit/2fd5e11f469427d474983b2d1c47be9408677591).

  ### Added

  - Added a `--fail-on-error` flag to return a `1` error code when errors were found (#416, @marcodejongh)
  - Created `template.asyncExpression` (#405, @jedwards1211)

  ### Changed

  - Removed lodash dependency from tsx parser (#432, @JHilker and @robyoder)

## 0.6.6

### Patch Changes

- [`d0ef46dee01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0ef46dee01) - Removes ts-node / cjs bundle switcher from main entrypoint of codemod-utils and updated codemod-cli scripts to support

## 0.6.5

### Patch Changes

- [`fdbd74cdb32`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdbd74cdb32) - Remove --no-babel flag when parser flow is used

## 0.6.4

### Patch Changes

- [`6a0b92d2af9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a0b92d2af9) - MONO-103 Fixed bug were codemod-cli would erronously run

## 0.6.3

### Patch Changes

- [`30c279f85eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/30c279f85eb) - Bump atlassian-forks-jscodeshift to "^0.12.2-atlassian-6".

## 0.6.2

### Patch Changes

- [`6c420d1698d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c420d1698d) - Fix application of --no-babel flag

## 0.6.1

### Patch Changes

- [`13d9c023e8d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13d9c023e8d) - Log the package version when running codemod cli

## 0.6.0

### Minor Changes

- [`cdd78d4ff38`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cdd78d4ff38) - The codemod-cli can fail on error when the flag `--fail-on-error` is passed, it will return a 1 exit code when errors were found during execution of codemods

  This flag `--fail-on-error` was added as part of this [PR](https://github.com/facebook/jscodeshift/pull/416) that forked `jscodeshift`.

  In Atlassian Frontend, we are now using the fork of `jscodeshift`, [atlassian-forks-jscodeshift](https://www.npmjs.com/package/atlassian-forks-jscodeshift) till we get this change back to the library.

  Add `--fail-on-error` in the config to be passed as a flag when the codemod runs - only for branch integrator.

## 0.5.3

### Patch Changes

- [`d72b572dfc2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d72b572dfc2) - bumped jscodeshift@^0.11.0
- [`d72b572dfc2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d72b572dfc2) - bumped @types/jscodeshift@^0.11.0

## 0.5.2

### Patch Changes

- [`cfd7c0b5bcc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfd7c0b5bcc) - Update the logic to properly check for the env var FAIL_CODEMODS_ON_ERROR and add `--no-babel` when running js file.

## 0.5.1

### Patch Changes

- [`6afd79db199`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6afd79db199) - Bump dependency "meow" to version ^6.0.0

## 0.5.0

### Minor Changes

- [`a9e359236b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9e359236b4) - The codemod-cli can fail on error when the flag `--fail-on-error` is passed, it will return a 1 exit code when errors were found during execution of codemods
  This flag `--fail-on-error` was added as part of this [PR](https://github.com/facebook/jscodeshift/pull/416) that forked `jscodeshift`.
  In Atlassian Frontend, we are now using the fork of `jscodeshift`, [atlassian-forks-jscodeshift](https://www.npmjs.com/package/atlassian-forks-jscodeshift) till we get this change back to the library.

  Add `--fail-on-error` in the config to be passed as a flag when the codemod runs - only for branch integrator.

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

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.4.1

### Patch Changes

- [`88ceeac950`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88ceeac950) - Fix CLI not working due to missing ts-node dependency

## 0.4.0

### Minor Changes

- [`d9f34d27e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d9f34d27e8) - Add --packages flag to automatically run codemods for specific packages
  Add --sinceRef flag to automatically run codemods that have been upgraded since a certain git ref
  Add support for running over multiple filepaths
  Extend support to restricted scoped packages
  Expose programmatic API

### Patch Changes

- [`d9f34d27e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d9f34d27e8) - Fix transforms being sourced from nested node_modules directories
  Return non-zero exit codes on failure

## 0.3.4

### Patch Changes

- [`f664568219`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f664568219) - Codemods are now presented with their module name prepended to make it easier to see which codemod belongs to which packages

## 0.3.3

### Patch Changes

- [`4be3a868e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4be3a868e1) - Ensure the library is running with the Node environment + adds ts-lib

## 0.3.2

### Patch Changes

- [`78dde805ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78dde805ef) - Fixes an issue with loading presets in javascript

## 0.3.1

### Patch Changes

- [`b4e29ceda2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4e29ceda2) - Fixed broken entrypoint

## 0.3.0

### Minor Changes

- [`332a418dd1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/332a418dd1) - Adds the concept of presets to act as a library of codemods relevant to an entire library or repo rather than specific component codemods. Also introduces the styled-to-emotion codemod

## 0.2.0

### Minor Changes

- [minor][63787f3327](https://bitbucket.org/atlassian/atlassian-frontend/commits/63787f3327):

  Initial implementation of the Codemod-cli

### Patch Changes

- Updated dependencies [168b5f90e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/168b5f90e5):
  - @atlaskit/docs@8.5.1
