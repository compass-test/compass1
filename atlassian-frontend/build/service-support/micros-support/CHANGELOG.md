# @atlassian/micros-support

## 0.3.6

### Patch Changes

- [`67614540b80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67614540b80) - Add `poco` plugin installation to `install-statlas.sh`.

## 0.3.5

### Patch Changes

- Updated dependencies

## 0.3.4

### Patch Changes

- [`2c4e828530f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c4e828530f) - Bump `aws-sdk` from `2.631.0` to `2.897.0` to fix a vulnerability [issue](fix https://sca.analysiscenter.veracode.com/vulnerability-database/vulnerabilities/29033).

  See this [ticket](https://asecurityteam.atlassian.net/browse/VULN-386209), for further information.

## 0.3.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc
- Updated dependencies

## 0.3.2

### Patch Changes

- [`c709b5e800`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c709b5e800) - Fixing Denial Of Service (DoS) vulnerability found in node-fetch - bump node fetch 2.6.1.

  - Bump `node-fetch` to 2.6.1 - we were already resolving to 2.6.0
  - Run `yarn-deduplicate --packages node-fetch` in all 4 yarn.lock
  - Bump `cross-fetch` to 3.0.6 that has the latest version of `node-fetch`
  - Run `yarn-deduplicate --packages cross-fetch`
  - Bump `jest-fetch-mock` to 3.0.3 that has the latest version of node-fetch

  Unfortunately due to styled-components bring `fbjs` and an old version of `node-fetch` we had to force the resolutions in lot of places.

## 0.3.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.3.0

### Minor Changes

- [`71fa8520b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71fa8520b1) - Expose command handler for scripts.

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [`79eb3b2958`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79eb3b2958) - Remove --isDev flag from deploy lambda cli and always upload unique lambda artefacts

## 0.1.0

### Minor Changes

- [`bbd034850b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bbd034850b) - Minor release micros support to get it out of 0.0.x range

## 0.0.6

### Patch Changes

- [`a37ef83443`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a37ef83443) - Remove custom typings of @atlassian/express-asap now that types are provided.

## 0.0.5

### Patch Changes

- [patch][1210f52904](https://bitbucket.org/atlassian/atlassian-frontend/commits/1210f52904):

  Adding a consumable ASAP middleware creator.

## 0.0.4

### Patch Changes

- [patch][3ad88ea458](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ad88ea458):

  add af-pipelines-notifications service

## 0.0.3

### Patch Changes

- [patch][eb306202c1](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb306202c1):

  support for other lambdas and added branch-netlify-redirect service

## 0.0.2

### Patch Changes

- [patch][080f7d1cf0](https://bitbucket.org/atlassian/atlassian-frontend/commits/080f7d1cf0):

  DOing a bump to make the changesets check happy
