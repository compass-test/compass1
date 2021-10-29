# @atlassian/bitbucket-run-pipeline

## 0.7.3

### Patch Changes

- Updated dependencies

## 0.7.2

### Patch Changes

- [`04c28ec9db8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04c28ec9db8) - exclude pipelines variables if a default value is used

## 0.7.1

### Patch Changes

- [`0ca101f7317`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ca101f7317) - submit variable with an empty value if default value was defined for it

## 0.7.0

### Minor Changes

- [`58a7e04e562`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58a7e04e562) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer to be on the right instead of the left.

### Patch Changes

- Updated dependencies

## 0.6.0

### Minor Changes

- [`afa12f5cf08`](https://bitbucket.org/atlassian/atlassian-frontend/commits/afa12f5cf08) - [ux] prepopulate a pipeline variable default value

## 0.5.1

### Patch Changes

- Updated dependencies

## 0.5.0

### Minor Changes

- [`3d4c6962343`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d4c6962343) - [ux] Update text message for RunPipelineMessage when allowance is over

## 0.4.13

### Patch Changes

- Updated dependencies

## 0.4.12

### Patch Changes

- Updated dependencies

## 0.4.11

### Patch Changes

- Updated dependencies

## 0.4.10

### Patch Changes

- [`1c6aadb475f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c6aadb475f) - Changes to create vr tests

## 0.4.9

### Patch Changes

- [`c50a63f9f72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c50a63f9f72) - Upgrade `@types/react-select` to `v3.1.2` and fix type breaks
- Updated dependencies

## 0.4.8

### Patch Changes

- Updated dependencies

## 0.4.7

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.4.6

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.4.5

### Patch Changes

- Updated dependencies

## 0.4.4

### Patch Changes

- [`f950245c49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f950245c49) - Disable tinted blanket in modals

## 0.4.3

### Patch Changes

- Updated dependencies

## 0.4.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [`3d9af4bf60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d9af4bf60) - Fix secured variables not respecting feature flag

## 0.3.0

### Minor Changes

- [`7694c1e689`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7694c1e689) - Add create schedule dialog as export

## 0.2.0

### Minor Changes

- [`1496af8de4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1496af8de4) - Prevent non admins from running pipelines

## 0.1.0

### Minor Changes

- [`a5bbe22c9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a5bbe22c9d) - Initial version
