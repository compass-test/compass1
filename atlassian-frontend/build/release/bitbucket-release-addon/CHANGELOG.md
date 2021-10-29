# @atlaskit/bitbucket-releases-addon

## 2.0.2

### Patch Changes

- [`b8cf033738`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8cf033738) - Bumped react-dev-server to fix DoS issue

## 2.0.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 1.1.10

### Patch Changes

- [`64e7f3f077`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64e7f3f077) - Bump dependency query-string to ^5.1.0

## 1.1.9

### Patch Changes

- [`01214127c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01214127c9) - Updated netlify-cli to latest version, updated website-constellation constants to reflect .env functionality in netlify dev

## 1.1.8

### Patch Changes

- [patch][e3afcf13e6](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3afcf13e6):

  Netlify changed their domain name and it needs to `.app` instead of `.com`.

## 1.1.7

### Patch Changes

- [patch][1d31492be9](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d31492be9):

  Added auth integration to website-constellation and associated ui elements in gatsby theme brisk- Updated dependencies [dae900bf82](https://bitbucket.org/atlassian/atlassian-frontend/commits/dae900bf82):

  - @atlaskit/build-utils@2.6.4

## 1.1.6

### Patch Changes

- [patch][a24d90c500](https://bitbucket.org/atlassian/atlassian-frontend/commits/a24d90c500):

  As #atlaskit-build has been archived, we point now to #atlassian-frontend.

## 1.1.5

### Patch Changes

- [patch][fd193e63b1](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd193e63b1):

  Fix dead link for releasing packages

## 1.1.4

### Patch Changes

- [patch][b8fe220790](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b8fe220790):

  Detect version of changeset being used from the PR and display changes accordingly

## 1.1.3

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 1.1.2

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 1.1.1

### Patch Changes

- [patch][a03a8d4db8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a03a8d4db8):

  Only display on open PRs and restrict changeset support to one per repo (either fs or commit changesets)

## 1.1.0

- [minor][44ec8bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44ec8bf):

  - Consume fs changesets as well as commit changesets

- Updated dependencies [44ec8bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44ec8bf):
  - @atlaskit/build-releases@3.0.0

## 1.0.1

- [patch] Upgrade to webpack 4 [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)
