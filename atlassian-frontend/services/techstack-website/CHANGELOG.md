# @atlassian/techstack-website

## 0.2.8

### Patch Changes

- Updated dependencies

## 0.2.7

### Patch Changes

- [`b8cf033738`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8cf033738) - Bumped react-dev-server to fix DoS issue

## 0.2.6

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.2.5

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

- Updated dependencies

## 0.2.4

### Patch Changes

- Updated dependencies

## 0.2.3

### Patch Changes

- [patch][a261bdd93b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a261bdd93b):

  # What have been improved?

  - The `react` and `react-dom` modules were pulled as direct dependencies and it was not needed, only referencing it as `peerDepencies` it is fine in the mono-repository.

  - The `lodash` module is not needed to be pulled in as the package only used `lodash.merge` and `lodash.max`.- Updated dependencies [a261bdd93b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a261bdd93b):
  - @atlassian/techstack-visualisation@0.3.4

## 0.2.2

### Patch Changes

- Updated dependencies [15237ae087](https://bitbucket.org/atlassian/atlassian-frontend/commits/15237ae087):
  - @atlassian/techstack-visualisation@0.3.0

## 0.2.1

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/css-reset@5.0.10
  - @atlassian/techstack-visualisation@0.2.1

## 0.2.0

### Minor Changes

- [minor][37c48b675d](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c48b675d):

  Add routing and sweet state for state management

### Patch Changes

- Updated dependencies [37c48b675d](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c48b675d):
  - @atlassian/techstack-visualisation@0.2.0
