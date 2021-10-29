# @af/service-deployments

## 0.7.4

### Patch Changes

- [`c5e13a38984`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c5e13a38984) - reference correct statlas script

## 0.7.3

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 0.7.2

### Patch Changes

- [`cc5b8abc758`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc5b8abc758) - Only trigger branch deploys for changesets that have been added since the base branch.

## 0.7.1

### Patch Changes

- [`2e5cde5424`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e5cde5424) - Check lock script now stops the pipeline instead of erroring.

## 0.7.0

### Minor Changes

- [`9437da9ef7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9437da9ef7) - Added action to lock service deployments

## 0.6.0

### Minor Changes

- [`6eb62617c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb62617c1) - Added slack integration for deployment notifications

## 0.5.0

### Minor Changes

- [`9772523d24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9772523d24) - CLI to communicate from pipelines to Service API

## 0.4.0

### Minor Changes

- [`1096e6de66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1096e6de66) - Slack integration

## 0.3.1

### Patch Changes

- [`97fe082469`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97fe082469) - New steps for executing static service rollbacks.

## 0.3.0

### Minor Changes

- [`a38b0ae342`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a38b0ae342) - Part 1 of static rollbacks: uploading artefacts for each master deployment.

## 0.2.1

### Patch Changes

- [`67fc3011e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67fc3011e7) - Allow deploying when dependencies change.

## 0.2.0

### Minor Changes

- [`8b84a00862`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b84a00862) - Add support for micros branch deployments.

## 0.1.0

### Minor Changes

- [`104dc15475`](https://bitbucket.org/atlassian/atlassian-frontend/commits/104dc15475) - Renamed commands and added support for branch deploying static services to Statlas.

## 0.0.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.0.3

### Patch Changes

- [`21cb020a52`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21cb020a52) - Allow deployments to non-prod environments from master.

## 0.0.2

### Patch Changes

- [`dad1083459`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dad1083459) - get-service-name script that derives the name of a service from a package name.

## 0.0.1

### Patch Changes

- [`189a00ea75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/189a00ea75) - Scripts and tools for deloying services from the repo.
- Updated dependencies
