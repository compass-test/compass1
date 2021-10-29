# @atlassian/pipelines-yml-validator

## 0.17.1

### Patch Changes

- Updated dependencies

## 0.17.0

### Minor Changes

- [`1d40c904eb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d40c904eb9) - Validates for more than one runners system label used on a step

### Patch Changes

- Updated dependencies

## 0.16.0

### Minor Changes

- [`aa09b5de8a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa09b5de8a2) - Support default variable value

## 0.15.0

### Minor Changes

- [`a1fa295bcf1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1fa295bcf1) - Allow docker type in services

## 0.14.0

### Minor Changes

- [`7845a11d3c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7845a11d3c8) - Support 1x, 2x, 4x or 8x sizes for self-hosted runners

## 0.13.0

### Minor Changes

- [`107787b95ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/107787b95ed) - Correct skip-ssl-verify yml property

## 0.12.0

### Minor Changes

- [`839e98519a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/839e98519a1) - Update error wording

## 0.11.1

### Patch Changes

- [`ce368705ac1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce368705ac1) - Added new option for skipSslVerify in clone shape

## 0.11.0

### Minor Changes

- [`ddbc7c9f766`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ddbc7c9f766) - Allow number only environments

## 0.10.0

### Minor Changes

- [`362d5afa728`](https://bitbucket.org/atlassian/atlassian-frontend/commits/362d5afa728) - This will display an info message to the user that step runtimes over 120 minutes are only allowed on Standard and Premium plans

## 0.9.1

### Patch Changes

- [`68499f46c13`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68499f46c13) - add oidc-role element to aws ecr image definition

## 0.9.0

### Minor Changes

- [`951c3e71b4c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/951c3e71b4c) - [ux] Handling a new default runners label

## 0.8.1

### Patch Changes

- [`aaba585e59e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aaba585e59e) - Support validation of nested components under artifacts map

## 0.8.0

### Minor Changes

- [`d4d9eb7d449`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4d9eb7d449) - Support for oidc token generation

## 0.7.0

### Minor Changes

- [`8faf34f3b1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8faf34f3b1f) - Support for runs-on label being inline

## 0.6.1

### Patch Changes

- [`e599c8d0443`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e599c8d0443) - Support new artifacts syntax in parallel steps

## 0.6.0

### Minor Changes

- [`8c61870258`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c61870258) - Added validation for runs-on to be able to use runner for your pipeline

## 0.5.0

### Minor Changes

- [`3fbd1f9c9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fbd1f9c9a) - Add support for new object-based "artifacts" section in bitbucket pipelines YML validator

## 0.4.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.4.0

### Minor Changes

- [`6fd47a0ce0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fd47a0ce0) - Allow parallel manual steps

## 0.3.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.3.0

### Minor Changes

- [`1439a192bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1439a192bf) - Allow manual steps in parallel in the pipelines yml validator.

## 0.2.4

### Patch Changes

- [`3dab55c56c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3dab55c56c) - Update validator syntax errors

## 0.2.3

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.2.2

### Patch Changes

- [`8d7d60879d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d7d60879d) - Fix custom variables validation

## 0.2.1

### Patch Changes

- [`b47ac09347`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b47ac09347) - Handle unknown error exception

## 0.2.0

### Minor Changes

- [`f96445e243`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f96445e243) - release package

## 0.1.0

- [major] Initial version
