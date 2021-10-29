# @atlaskit/build-utils

## 2.11.2

### Patch Changes

- [`9bf40ffc573`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9bf40ffc573) - Remove bug with hardcoded state

## 2.11.1

### Patch Changes

- [`95b92b60385`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95b92b60385) - Fix accuracy of return type for `PullRequestClient.approve`

## 2.11.0

### Minor Changes

- [`f71f9a48a44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f71f9a48a44) - Added ability to approve an opened pull request from within `bitbucket/PullRequestClient.ts`.

  `await prClient.approve(id)`

## 2.10.0

### Minor Changes

- [`ba4e0143354`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba4e0143354) - Added ability to decline or close an opened pull request from within `bitbucket/PullRequestClient.ts`.

  `await prClient.decline(id)` returns a boolean response:

  - `true` when it successfully declined
  - `false` when it failed.

## 2.9.1

### Patch Changes

- [`85722e6beff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85722e6beff) - Fix for JiraClient.addIssueAttachement to obtain file path value instead of index within for loop.

## 2.9.0

### Minor Changes

- [`bb8e74a445d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb8e74a445d) - Add ability to upload attachments into a Jira ticket within JiraClient.

## 2.8.13

### Patch Changes

- [`ec2052a4b9b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec2052a4b9b) - Bamboo utils fix when the `BuildResultKey` is undefined.

## 2.8.12

### Patch Changes

- [`02ea742e67a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02ea742e67a) - Added a function that returns the running product builds urls and upload the `in-progress` status after the product build is triggered.
  This was added to avoid the use case where `Bamboo` encounters an infra issue and do not properly post / upload the build status to the pull request in `Atlassian Frontend`.

## 2.8.11

### Patch Changes

- [`cbcf8be2d75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cbcf8be2d75) - Refactor `stopAllRunningBuilds` and exit when a build is not running.

## 2.8.10

### Patch Changes

- [`c72f9c7757c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c72f9c7757c) - Add a function that stops all running build in Bamboo.

## 2.8.9

### Patch Changes

- [`5244523cd0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244523cd0c) - - Only `branch-deploy` `editor-mobile-bridge` to s3 and other packages use by default the private registry.
  - Refactored `product integrator` to use private registry by default.
  - Remove `branch installer` package that is now obsolete and update DAC docs.

## 2.8.8

### Patch Changes

- [`7d639211812`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d639211812) - - Add an `addTask` function to `PullRequestClient` to comment and add task to pull requests.

  - Refactor scripts to use environment variables instead of CLI flags.

  - Add a pipeline build protected by a `password` to run this build.

## 2.8.7

### Patch Changes

- [`8f981d14ef9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f981d14ef9) - We now support triggering custom handling when multiple special case prefixes are used within a branch name.
  For example, it will allow multiple prefixes to be prepended to a branch like `no-changeset/skip-product/my-branch-name`.

## 2.8.6

### Patch Changes

- [`b3b6e85587f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3b6e85587f) - Add a new `tool` and `packageInfo` for build and branch deploy.

## 2.8.5

### Patch Changes

- [`13b9dc4c634`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13b9dc4c634) - Add `async-retry` for queueing build in Bamboo.

## 2.8.4

### Patch Changes

- [`50b88501cb4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50b88501cb4) - In order to prevent triggering and running pipelines on old or existing running commits, I added a utils function to check for that.

## 2.8.3

### Patch Changes

- [`7f0a6222064`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f0a6222064) - Convert getTransitiveDependencies into an iterative BFS approach.

## 2.8.2

### Patch Changes

- [`e06cdab8b7d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e06cdab8b7d) - Add the capability to rename a build status by prepending [OPT] tag and making the build optional.

## 2.8.1

### Patch Changes

- [`b802d853a8d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b802d853a8d) - Enhance `JiraClient.createIssue` ADF Type

## 2.8.0

### Minor Changes

- [`9c4d373af4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c4d373af4e) - Updates `JiraClient` with new capabilities:

  - `getProjectDetails` returns project details for a given project key (e.g. AFP) ([docs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-projectidorkey-get)).
  - `createIssue` creates a new issue within a specific project ([docs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post))

## 2.7.14

### Patch Changes

- [`694933faa0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/694933faa0d) - Add the capability to queue / start build in Bamboo.

## 2.7.13

### Patch Changes

- [`d428d02733a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d428d02733a) - Add a functionality to opt out of product integrator using a flag in package.json.

## 2.7.12

### Patch Changes

- [`701d76ea2f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/701d76ea2f0) - Add a check for top commit when triggering the product integrator.

## 2.7.11

### Patch Changes

- [`8abf0d3fa9f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8abf0d3fa9f) - Add Bamboo CLI tool

## 2.7.10

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 2.7.9

### Patch Changes

- [`de219710238`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de219710238) - Moving bamboo utils to build utils in preparation of the bamboo cli tool.

## 2.7.8

### Patch Changes

- [`2a58d2f37b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a58d2f37b5) - Fix typo in examples optout for changeset check

## 2.7.7

### Patch Changes

- [`24dcd300d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24dcd300d2) - ED-11036 Update BB pullrequest type with the correct mergeHash interface

## 2.7.6

### Patch Changes

- [`922720b6fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/922720b6fd) - Add an additional check for tsconfig.json under `cjs` for icon packages. In addition, replace mergeBaseCommit by empty string for local download.

## 2.7.5

### Patch Changes

- [`66ed807550`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66ed807550) - Fix for `markdown-to-jsx` vulnerability issue. Use `yarn-deduplicate` to resolve to the latest version that does not have vulnerability issue `6.11.4`.

  Fix for `sync-exec` brought by `npm-run`. `npm-run` was not used in the repository - removing it remove the dependency on `sync-exec`

## 2.7.4

### Patch Changes

- [`f4748b60e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4748b60e5) - Update logic to trigger the AK website when a package has a docs folder.

## 2.7.3

### Patch Changes

- [`4a82823910`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a82823910) - Using changedPackages and filter packages for Jira branch deploy.

## 2.7.2

### Patch Changes

- [`7669079831`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7669079831) - Add getPackagesOnScheduledReleases & getPackagesOnContinuousReleases to build/utils.

## 2.7.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.7.0

### Minor Changes

- [`7c470c8704`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7c470c8704) - Added PipelinesClient to build-utils/bitbucket.

## 2.6.21

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 2.6.20

### Patch Changes

- [`b059536660`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b059536660) - Logic for deciding if the design system docs build should run has been added. You can access this via `runDesignSystemDocs` in `tools.js`.

## 2.6.19

### Patch Changes

- [`8d8bc7e580`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d8bc7e580) - Created the BuildStatusClient for querying, creating, and updating commit build statuses.

## 2.6.18

### Patch Changes

- [`64e7f3f077`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64e7f3f077) - Bump dependency query-string to ^5.1.0

## 2.6.17

### Patch Changes

- [`f2421e8a75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2421e8a75) - The issue was in `tool.js`, `testWebdriverExists` and `testVisualRegressionExists` depend on the actual path existence check for `pkgName/src/__tests__/integration` or `pkgName/src/__tests__/visual-regression`.
  However, some packages have sub-folders between `src` and `__tests__` hence the script was returning `false` for those components and was not running those tools.

  The fix is to use a better path filtering using `globby` to check if packages have `integration` or `visual-regression` tests.

## 2.6.16

### Patch Changes

- [`e742d1bd2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e742d1bd2a) - In `@atlaskit/build-utils`, `updateBuildStatus` function is now converted in TS.
  In `@atlaskit/ci-scripts`, `update.build.status.with.netlify.link.js` is now `update-build-status.ts`:

  - It has been converted to TS.
  - It is now a standard CLI script not related to `Netlify` to update any build status.

## 2.6.15

### Patch Changes

- [`46f57c42de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46f57c42de) - Export getMergeBase from git utils.

## 2.6.14

### Patch Changes

- [`73f33b1b61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73f33b1b61) - Remove deprecated AF package.json types.

## 2.6.13

### Patch Changes

- [`0f2762456d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f2762456d) - Remove changeset.js only used for translation

## 2.6.12

### Patch Changes

- [`04722f440f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04722f440f) - Our node scripts `get.changed.packages.since.base.branch.js` and `run.if.tool.changed` used with `--dependents='direct'` failed silently in CI when getting the dependency graph for `@atlaskit/docs`. The issue was related to packages without a "dependencies" field.

  The fix was to make sure we check for `dependencies` field to be there.

  In addition, our scripts were silently failing because these scripts are executed in sub shells that don’t always cause the parent shell to exit with failure. This [link](https://unix.stackexchange.com/questions/23026/how-can-i-get-bash-to-exit-on-backtick-failure-in-a-similar-way-to-pipefail) and this [one](https://stackoverflow.com/a/43221766/893630)suggests a way to workaround this by assigning subshells to the variable first.

## 2.6.11

### Patch Changes

- [`9bdf7b35ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9bdf7b35ef) - Enforce the check for building packages and for building the website.

## 2.6.10

### Patch Changes

- [patch][6b8aae1a48](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8aae1a48):

  AFP-1661:

  - Adding `bundlesize` to `tool.js` to extend `packageInfo` function and running the tool when needed.
  - Renaming the script `get.pkgs.in.team.js` to `split.pkgs.for.bundle.size.step.js`. Updated the script based on the `packageInfo` and extend `get.glob.packages.for.tools.js` to use `bundlesize`.

  The script `split.pkgs.for.bundle.size.step.js` now:

  - does not no longer use the `team` folder
  - gets all the packages that needs the bundle size tool to be run
  - split the array of packages based on the `BITBUCKET_PARALLEL_STEP`.

## 2.6.9

### Patch Changes

- [patch][5244e00425](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244e00425):

  Add runWebsite and expend run.tool.if.changed.js to check if a package changed needs to trigger a website build.

## 2.6.8

### Patch Changes

- [patch][72eb99e88b](https://bitbucket.org/atlassian/atlassian-frontend/commits/72eb99e88b):

  Refactor getPackagesWithDependents in build/utils, refactor the script run.tool.if.changed to use meow and extend changed packages to dependents.

## 2.6.7

### Patch Changes

- [patch][adf1b1b17e](https://bitbucket.org/atlassian/atlassian-frontend/commits/adf1b1b17e):

  Remove usage of bolt-query.

## 2.6.6

### Patch Changes

- [patch][6489b8a1f9](https://bitbucket.org/atlassian/atlassian-frontend/commits/6489b8a1f9):

  Adding a script in pipeline `node build/ci-scripts/run.tool.if.changed.js build -- yarn build` that checks if a package needs to be built.

## 2.6.5

### Patch Changes

- [patch][03add6d4b5](https://bitbucket.org/atlassian/atlassian-frontend/commits/03add6d4b5):

  # What have been fixed?

  - `inquirer` version `3.3.0` . It has been fixed by bumping it to `6.4.0`. [Changelog](https://github.com/SBoudrias/Inquirer.js/compare/v3.3.0...v6.0.0) Mostly improvement and Node support.
  - `svgexport` version `0.3.2`. I has been fixed by bumping to `0.4.0`. There is no changelog but this is the change before the bump to [0.4.0](https://github.com/shakiba/svgexport/commit/3acbf51f0687f54d1972265cd3aef4c6a7e925fc), it should not affect anything.

## 2.6.4

### Patch Changes

- [patch][dae900bf82](https://bitbucket.org/atlassian/atlassian-frontend/commits/dae900bf82):

  Add method to PullRequestClient for creating pull requests.

## 2.6.3

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
  - ms: 0.7.1 → removed. Removed source-trace, which was an unused dependency from a deprecated package.

## 2.6.2

### Patch Changes

- [patch][1ef9e161ff](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ef9e161ff):

  In Landkid(Custom build), the BITBUCKET_BRANCH environment variable is undefined. The logic for changed packages was defaulting to master branch, hence, running unnecessary packages and consuming resources.

## 2.6.1

### Patch Changes

- [patch][7849549454](https://bitbucket.org/atlassian/atlassian-frontend/commits/7849549454):

  Adding s3 client to build-utils

## 2.6.0

### Minor Changes

- [minor][ccbd1b390b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ccbd1b390b):

  - Update build tooling to:
    - Only build typescript packages with a `build/tsconfig.json` dir rather than any package with `tsconfig.json` in the root
    - Remove concept of cli packages with a `build/cli/tsconfig.json` and update them to use the standard build
    - Separate the typecheck and typescript build properties in `getPackageInfo` to allow typechecking our build packages without attempting to build them

## 2.5.0

### Minor Changes

- [minor][6bce2c0290](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6bce2c0290):

  Fix the circular dependencies between build releases and build utils by moving flattenReleases and parseChangesetCommit to build-utils.

## 2.4.0

### Minor Changes

- [minor][a41507a34d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a41507a34d):

  Add createSpyObject function to build-utils/logging
  Add bitbucket utils under build-utils/bitbucket

## 2.3.0

### Minor Changes

- [minor][2e18ff850d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e18ff850d):

  Add runCommands module that runs commands via concurrently.

## 2.2.7

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 2.2.6

### Patch Changes

- [patch][ae47159713](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ae47159713):

  Remove unused code inside utils/git.js

## 2.2.5

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 2.2.4

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 2.2.3

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 2.2.2

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details

## 2.2.1

### Patch Changes

- [patch][6c713b8420](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c713b8420):

  Upgrade bitbucket-build-status >= 1.1.0 that has the upgrade to lodash >=4.17.11

## 2.2.0

- [minor][cfb830c23b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cfb830c23b):

  - getExamplesFor will look for an exact match when passed a scoped package name

## 2.1.0

- [minor][fd6a020](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fd6a020):

  - Add new git command: getChangedChangesetFilesSinceMaster

## 2.0.3

- [patch][536456a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/536456a):

  - Fix getCommitThatAddsFile function to not have quotes, use entire first line

## 2.0.2

- Updated dependencies [44ec8bf"
  d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44ec8bf"
  d):
  - @atlaskit/build-releases@3.0.0

## 2.0.0

- [major] Safety bump, some refactoring of utils, but we don't want to break consumers [ecada97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecada97)

## 1.12.1

- [patch] Fixes git tagging issue [8af28a3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8af28a3)

## 1.12.0

- [minor] Fixed minor bug in utils/packages added ref to wrappedcomponent of withRenderTarget HoC for better testability [58be62a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58be62a)
