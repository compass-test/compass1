# @af/package-ownership

## 1.2.3

### Patch Changes

- [`5ff63e39dc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ff63e39dc3) - Remove ec2 compute from lambda services

## 1.2.2

### Patch Changes

- [`a0a1faaaaea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0a1faaaaea) - Update resource owner

## 1.2.1

### Patch Changes

- [`5281f3a321b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5281f3a321b) - AFP-3203 Update commit SHA minimum length from 7 characters to 8 characters. Update commit hash truncation to 12 character SHA.

## 1.2.0

### Minor Changes

- [`e9eebe37d95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9eebe37d95) - [MONO-119](https://product-fabric.atlassian.net/browse/MONO-119) Support assigning an entire team as reviewers.

  Adds a new `reviewerMethod?: 'random' | 'entire-team'` property within the `upload-metadata` endpoint to specify whether you want a random assignee, or an entire team assigned to a pull request. _Default: 'random'_

  > It compliments the existing `allowAddReviewers` configuration property. If `allowAddReviewers` is false, then `reviewerMethod` will be inert.

## 1.1.13

### Patch Changes

- [`f3799e8cb2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3799e8cb2a) - Update organisation field in service descriptor

## 1.1.12

### Patch Changes

- [`13d8a3b16d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13d8a3b16d6) - Upgrade @atlassian/micros-serverless-platform dependency to 0.0.9 to fix a security vulnerability in transitive aws-sdk dependency

## 1.1.11

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 1.1.10

### Patch Changes

- [`7783aedafde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7783aedafde) - Add ip_whitelist attribute to the globaledge resource.

## 1.1.9

### Patch Changes

- [`724b8d1ae8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/724b8d1ae8f) - Ownership check is only ignored for prefixes not tags.

## 1.1.8

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.1.7

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.1.6

### Patch Changes

- [`1eee84d212`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1eee84d212) - Opting into automatic deployments from master.
- Updated dependencies

## 1.1.5

### Patch Changes

- [`64e7f3f077`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64e7f3f077) - Bump dependency query-string to ^5.1.0

## 1.1.4

### Patch Changes

- Updated dependencies

## 1.1.3

### Patch Changes

- Updated dependencies

## 1.1.2

### Patch Changes

- Updated dependencies

## 1.1.1

### Patch Changes

- [`92990ca49c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92990ca49c) - Only attempt to add reviewers/comment to PR once.

## 1.1.0

### Minor Changes

- [`226521874a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/226521874a) - More information about teams and packages displayed in PR comment and provided by the /ownership-check endpoint.

## 1.0.6

### Patch Changes

- [`e6d537c6c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6d537c6c4) - package-ownership service unit tests.

## 1.0.5

### Patch Changes

- [patch][062b9336fe](https://bitbucket.org/atlassian/atlassian-frontend/commits/062b9336fe):

  Improved messaging in package-ownership PR comment.

## 1.0.4

### Patch Changes

- [patch][4e661dd92b](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e661dd92b):

  Prod vs Dev specific configurations.

## 1.0.3

### Patch Changes

- [patch][a3386e6db1](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3386e6db1):

  Use the internal staff directory for AAIDs instead of Bitbucket API.

## 1.0.2

### Patch Changes

- [patch][565869bf25](https://bitbucket.org/atlassian/atlassian-frontend/commits/565869bf25):

  New config option for ignoring certain tags in PR titles.

## 1.0.1

### Patch Changes

- [patch][ad8380f467](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad8380f467):

  Adding error handling to Bitbucket API requests, and logging throughout.

## 1.0.0

### Major Changes

- [major][dfa755055c](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfa755055c):

  Releasing the package-ownership lambda service.

### Patch Changes

- Updated dependencies [1210f52904](https://bitbucket.org/atlassian/atlassian-frontend/commits/1210f52904):
  - @atlassian/micros-support@0.0.5
