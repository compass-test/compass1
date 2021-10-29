# @atlaskit/measure

## 0.5.11

### Patch Changes

- [`6bfb6f64f41`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bfb6f64f41) - Moving bundle-size to its own package.

## 0.5.10

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 0.5.9

### Patch Changes

- [`5babcdd66a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5babcdd66a) - Fix for the bundle size tool to await for the file to be downloaded.

## 0.5.8

### Patch Changes

- [`922720b6fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/922720b6fd) - Add an additional check for tsconfig.json under `cjs` for icon packages. In addition, replace mergeBaseCommit by empty string for local download.

## 0.5.7

### Patch Changes

- [`0b0d4ac26d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b0d4ac26d) - For now, let's not measure with the mergeBaseCommit

## 0.5.6

### Patch Changes

- [`481da327b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/481da327b9) - Investigation for AFP-2520 where the bundle size shows high numbers.

## 0.5.5

### Patch Changes

- [`338ed911f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/338ed911f7) - Fix the upload to a mergeBaseCommit.

## 0.5.4

### Patch Changes

- [`fafb382db0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fafb382db0) - Fix for mergeBaseCommit & for the pipelines build to upload the bundle size data.

## 0.5.3

### Patch Changes

- [`bcf5380d9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bcf5380d9a) - Revert the changed that download the mergeBaseCommit, fix some error logs and add missing `version` metadata.
  Add a new flag `--baseline` to specify / override the baseline / base / target branch - default to master.

## 0.5.2

### Patch Changes

- [`undefined`](https://bitbucket.org/atlassian/atlassian-frontend/commits/undefined) - The measure tool accepts uploading and downloading file to/ from s3 using the mergeBaseCommit for more accurate bundle measurement.

## 0.5.1

### Patch Changes

- [`b2e0babdf8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2e0babdf8) - Adding the merge commit information && using the git method to detect the target branch
- Updated dependencies

## 0.5.0

### Minor Changes

- [`955edff9b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/955edff9b4) - ## New Features

  - Adding a flag `--entryPoints` to measure the entry points of a package. For now, we consider any files under `src` to be an entry point.

  ## Refactors

  - Remove any code that was not required in measure and cli files.
  - Adding tests for entrypoints and normal packages measurement.
  - Replace any mention of `atlaskit` by `atlassian-frontend` (except the s3 bucket name).

## 0.4.7

### Patch Changes

- [`b67da62394`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b67da62394) - Default to master the target branch.

## 0.4.6

### Patch Changes

- [`e832482c63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e832482c63) - Add `targetBranch` and `bitbucketBranch` to the s3 file.

## 0.4.5

### Patch Changes

- [patch][e3a1d6b92d](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3a1d6b92d):

  Remove \$StringLitteral as we are no longer using //@flow

## 0.4.4

### Patch Changes

- [patch][a9700acd1b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9700acd1b):

  Fix to use the team field in package.json- Updated dependencies [5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):

  - @atlaskit/webpack-config@2.1.1

## 0.4.3

### Patch Changes

- [patch][da5f4a8062](https://bitbucket.org/atlassian/atlassian-frontend/commits/da5f4a8062):

  AFP-1437 Fix high vulnerabilities

  Many insecure packages were found in a SourceClear scan of the repository that require fixing by 11 March 2020. The original scan can be found [here](https://atlassian.sourceclear.io/workspaces/100tz9Q/projects/152927/issues?branch=master).

  The following packages were updated in [this PR](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/905/afp-1437-fix-vulnerability-batch) to remove some of the high rated vulnerabilities:

  - merge: 1.2.0 → removed. Removed by updating tty-table where it was a direct dependency.
  - webpack-dev-server: 3.1.5 → 3.9.0. Deduplicating.
  - hoek: 2.16.3 → removed. Removed by raising the version of less where it was a direct dependency.
  - @hapi/hoek: 8.5.0 → 8.5.1. Made resolved version one patch bump higher.
  - moment: 2.18.1 → 2.19.3. Updated by bumping the dependent version of react-live-clock by a patch.
  - kind-of: 6.0.2 → 6.0.3. Made resolved version one patch bump higher.
  - sshpk: 1.13.1 → 1.16.1. Made resolved version several minor versions higher.
  - axios: 0.17.1 + 0.18.0 → 0.19.2.
    - Versions of axios being used directly were explicitly changed to require the safe version.
    - The old npm version of landkid was removed as a dependency.
    - traduki-lite was asked to bump their version of axios, and packages depending on it were updated to point to the latest patch.
  - mem: 1.1.0 → 4.0.0.
    - Improved one by bumping svg-sprite by a minor.
    - Removing source-trace.
    - gatsby is being bumped to fix last bad instance in a separate PR [here](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/963/no-issue-update-gatsby-dep-to-resolve-sec/diff).
  - https-proxy-agent: 0.3.6 → 3.0.1, 2.2.1 → 2.2.4. Updating @atlassian/nanos for the former and forcing higher patch resolution for the latter.
  - tar-fs: 1.12.0 → 1.16.3. Updating @atlassian/nanos.
  - ms: 0.7.1 → removed. Removed source-trace, which was an unused dependency from a deprecated package.- Updated dependencies [da5f4a8062](https://bitbucket.org/atlassian/atlassian-frontend/commits/da5f4a8062):
  - @atlaskit/build-utils@2.6.3

## 0.4.2

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 0.4.1

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 0.4.0

### Minor Changes

- [minor][c5d772775a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5d772775a):

  The measure tool is now public on npm.

  ## Description

  This tool measures bundle size of packages in Atlaskit.

  ## Documentation

  [Readme](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/build/measure/)
  [How do measure bundle size in Atlaskit](https://atlaskit.atlassian.com/docs/guides/bundle-size)

## 0.3.0

- [minor][0b87425d4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b87425d4a):

  - ED-6371 Support passing in package name only as opposed to path from root dir

## 0.2.1

- [patch][a6a76aa7cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6a76aa7cd):

  - Adds ability to send search terms for jira quick search

## 0.2.0

- [minor][d6970ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6970ce):

  - Various changes to measure cli in preperation of unleashing it to the masses. Added --updateSnapshot command to make updating of snapshots a explicit action.

## 0.1.0

- [minor][2297016](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2297016):

  - Improve measure CLI
