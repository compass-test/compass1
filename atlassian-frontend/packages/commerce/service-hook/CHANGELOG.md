# @atlassian/commerce-service-hook

## 2.0.0

### Major Changes

- [`26503e7fe58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26503e7fe58) - allow multiple arguments to be passed to useXyzService hooks

## 1.2.1

### Patch Changes

- [`134b21476f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/134b21476f2) - Adding contract testing to commerce components

## 1.2.0

### Minor Changes

- [`540572a12db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/540572a12db) - add autoRetry and withQueryParams helpers to service hooks

## 1.1.0

### Minor Changes

- [`d97794bf4a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d97794bf4a) - Introduce ship-to details service

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

## 0.2.0

### Minor Changes

- [`41aefba380`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41aefba380) - [ux] Add edge case handling scenarios for off-session 3ds confirmation challenge

## 0.1.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.1.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.1

### Patch Changes

- [`ebd5f3c530`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ebd5f3c530) - Throw rest error for http error responses

## 0.1.0

### Minor Changes

- [`00ea4b5f81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00ea4b5f81) - Add option to throw meaningful http errors

## 0.0.5

### Patch Changes

- [`0e2e25b548`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e2e25b548) - Expose fetch methods from services

## 0.0.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.0.3

### Patch Changes

- [`f9c7011aaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9c7011aaa) - Use service hook

## 0.0.2

### Patch Changes

- [`7e1a6994e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e1a6994e3) - Create commerce service hook
