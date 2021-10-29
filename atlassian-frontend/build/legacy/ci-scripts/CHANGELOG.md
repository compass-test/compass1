# @atlaskit/ci-scripts

## 1.7.11

### Patch Changes

- [`ac2313107e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac2313107e1) - @atlaskit/global-navigation has been removed from the Atlassian Frontend monorepo.

## 1.7.10

### Patch Changes

- [`7b52780cdde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b52780cdde) - Skip `merge-branch/` to trigger the flakey build pipelines.

## 1.7.9

### Patch Changes

- [`550fc3f74b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/550fc3f74b3) - Update `getChangedPackagesFromChangesets` to check for `changesets` in `release` property.
  It avoids unintented packages to be branch deployed and tested in the products.

## 1.7.8

### Patch Changes

- [`02ea742e67a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02ea742e67a) - Added a function that returns the running product builds urls and upload the `in-progress` status after the product build is triggered.
  This was added to avoid the use case where `Bamboo` encounters an infra issue and do not properly post / upload the build status to the pull request in `Atlassian Frontend`.

## 1.7.7

### Patch Changes

- [`86b34b81b0b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/86b34b81b0b) - Update `build/ci-scripts/fix-jest-junit-xml.ts` to support a custom JUint report path as an argument.

## 1.7.6

### Patch Changes

- [`cbcf8be2d75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cbcf8be2d75) - Refactor `stopAllRunningBuilds` and exit when a build is not running.

## 1.7.5

### Patch Changes

- [`80abc1ec1e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80abc1ec1e7) - remove experimental-bulk-integration package

## 1.7.4

### Patch Changes

- [`c72f9c7757c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c72f9c7757c) - Add a function that stops all running build in Bamboo.

## 1.7.3

### Patch Changes

- [`769ea83469c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/769ea83469c) - Moves tokens and eslint-plugin-design-system to the public namespace.

## 1.7.2

### Patch Changes

- [`5244523cd0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244523cd0c) - - Only `branch-deploy` `editor-mobile-bridge` to s3 and other packages use by default the private registry.
  - Refactored `product integrator` to use private registry by default.
  - Remove `branch installer` package that is now obsolete and update DAC docs.

## 1.7.1

### Patch Changes

- [`7d639211812`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d639211812) - - Add an `addTask` function to `PullRequestClient` to comment and add task to pull requests.

  - Refactor scripts to use environment variables instead of CLI flags.

  - Add a pipeline build protected by a `password` to run this build.

## 1.7.0

### Minor Changes

- [`f477c8f3586`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f477c8f3586) - `package-ownership-upload.ts` now supports assigning an _entire team_ as the reviewers on a pull request.

  The default remains as a single random team member assigned per package, but using a branch prefix of `team-review/` you can now opt into having your entire team assign to review your pull request.

## 1.6.10

### Patch Changes

- [`8f981d14ef9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f981d14ef9) - We now support triggering custom handling when multiple special case prefixes are used within a branch name.
  For example, it will allow multiple prefixes to be prepended to a branch like `no-changeset/skip-product/my-branch-name`.

## 1.6.9

### Patch Changes

- [`b3b6e85587f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3b6e85587f) - Add a new `tool` and `packageInfo` for build and branch deploy.

## 1.6.8

### Patch Changes

- [`50b88501cb4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50b88501cb4) - In order to prevent triggering and running pipelines on old or existing running commits, I added a utils function to check for that.

## 1.6.7

### Patch Changes

- [`af6e9d4eab2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af6e9d4eab2) - Make confluence build gating and removed all the code related to the Confluence Cypress Build.

## 1.6.6

### Patch Changes

- [`e06cdab8b7d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e06cdab8b7d) - Add the capability to rename a build status by prepending [OPT] tag and making the build optional.

## 1.6.5

### Patch Changes

- [`6bfb6f64f41`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bfb6f64f41) - Moving bundle-size to its own package.

## 1.6.4

### Patch Changes

- [`369a53bde52`](https://bitbucket.org/atlassian/atlassian-frontend/commits/369a53bde52) - Enable product integrator on merge branch prefix

## 1.6.3

### Patch Changes

- [`3da9b956c13`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3da9b956c13) - Fix downstream merge script.

## 1.6.2

### Patch Changes

- [`f375a192b00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f375a192b00) - Move `check.changesets` to run on `pull-request` build.
  We are now using `BITBUCKET_PR_DESTINATION_BRANCH` to get the target branch and compute more accuretely the changed packages with changesets when creating a pull request against `release-candidate/`.
  In addition, as `webdriver` step runs also on `pull-request` build, we modified the target branch to accept `BITBUCKET_PR_DESTINATION_BRANCH` and runs on more accurate changed packages.

## 1.6.1

### Patch Changes

- [`694933faa0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/694933faa0d) - Add the capability to queue / start build in Bamboo.

## 1.6.0

### Minor Changes

- [`a7539e65b4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7539e65b4e) - The `skip-vr-tests` npm script has been removed, along with it's related scripts/files within the `skip-inconsistent-tests` folder.

  This removal justifies a major SemVer bump, but because nothing consumed it externally, we're sticking to a minor for simplicity.

### Patch Changes

- [`d428d02733a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d428d02733a) - Add a functionality to opt out of product integrator using a flag in package.json.
- Updated dependencies

## 1.5.1

### Patch Changes

- [`701d76ea2f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/701d76ea2f0) - Add a check for top commit when triggering the product integrator.

## 1.5.0

### Minor Changes

- [`5b30c8c114a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b30c8c114a) - Add scripts to skip inconsistent VR tests

### Patch Changes

- Updated dependencies

## 1.4.24

### Patch Changes

- [`8abf0d3fa9f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8abf0d3fa9f) - Add Bamboo CLI tool

## 1.4.23

### Patch Changes

- [`ec70af6cc11`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec70af6cc11) - Refactor sending bundle size to TS and put back the command to send it

## 1.4.22

### Patch Changes

- [`bdd159c6cb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd159c6cb8) - Remove unused code, dependencies and replace by the new product integrator logic.

## 1.4.21

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 1.4.20

### Patch Changes

- [`233e2fba6d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/233e2fba6d2) - Adding an escape hatch for running the product integrator. You can currently prepend `skip-product/*` to not trigger the product integrator build. In addition, `merge-branch/*` and `master` are also opt out of this trigger.

## 1.4.19

### Patch Changes

- [`092aa77e8e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/092aa77e8e4) - Adding the capability to run product integrator from bitbucket pipeline.

## 1.4.18

### Patch Changes

- [`c1a73e68c0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1a73e68c0f) - Fix the trigger for build packages.

## 1.4.17

### Patch Changes

- [`6288accb149`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6288accb149) - Adding a script that checks if the branch deploy build has been already run based on a commit status check.

## 1.4.16

### Patch Changes

- [`513125ffff1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/513125ffff1) - 1. Adding release-candidate to trigger the Cypress Confluence build. 2. Adding reporting based on the Bamboo build status.

## 1.4.15

### Patch Changes

- [`64a1132b90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64a1132b90) - Add support for atlassiansox to new branch deploy integrator

## 1.4.14

### Patch Changes

- [`5a5cee2d2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a5cee2d2a) - - Adding a script to 'branch-deploy' folder to detect if a PR targets develop. If a PR targets develop, it will start the Cypress confluence build.
  - Adding the `atlaskitBranchName` as metadata to the `.atlaskitVersion` to be able to read the branch name in the Cypress confluence build.
  - Add a shell script to trigger the cypress fork.

## 1.4.13

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.4.12

### Patch Changes

- [`8fc7a0da26`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8fc7a0da26) - Fix object-path vulnerability by forcing the resolution to `^0.11.5`.
  Fix the vulnerability issue for clean-css (version `^4.2.3` has no vuln issue) by forcing the resolution of `html-identifier` to `^3.5.21`.

## 1.4.11

### Patch Changes

- [`31f583b885`](https://bitbucket.org/atlassian/atlassian-frontend/commits/31f583b885) - Revert this [PR](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6071/vuln-193783-vuln-object-path/diff).

  The issue was that the `yarn.lock` was not correctly reset after the `next` upgrade.

## 1.4.10

### Patch Changes

- [`4f53f876ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f53f876ff) - Fix object-path vulnerability by using the version `0.11.5`. Fix the vulnerability issue for clean-css by resolving it to `4.2.3`.

## 1.4.9

### Patch Changes

- [`66ed807550`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66ed807550) - Fix for `markdown-to-jsx` vulnerability issue. Use `yarn-deduplicate` to resolve to the latest version that does not have vulnerability issue `6.11.4`.

  Fix for `sync-exec` brought by `npm-run`. `npm-run` was not used in the repository - removing it remove the dependency on `sync-exec`

## 1.4.8

### Patch Changes

- [`a991f292bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a991f292bf) - Fix vulnerability issues for ajv and bunyan.

  ### ajv

  `ajv` was a `devDependency` for `renderer` and `adf-schema` however, the version used was causing vulnerability issue and was referenced in the root `package.json` as a dependency. Hence the scan raised a IDSV issue.

  `ajv` was bumped from `^4.11.3` to `^6.12.6.` However, due to `table` package `^4.0.1` pulled by `stylelint` version `8.4.0`, we had to add those resolutions

  ```
  "**/table/ajv": "^6.12.3",
  "**/table/ajv-keywords": "^3.4.1",
  ```

  ### bunyan

  A new patch version `1.8.14` has been released that fixes the vulnerability issue so a simple `bolt` resolve the the version `1.8.12` to `1.8.14`.
  The rest of the packages are using version `^2.04`.

## 1.4.7

### Patch Changes

- [`35a2a65f85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/35a2a65f85) - Fix filtering test files to only extensions such as .(js|jsx|ts|tsx)

## 1.4.6

### Patch Changes

- [`c709b5e800`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c709b5e800) - Fixing Denial Of Service (DoS) vulnerability found in node-fetch - bump node fetch 2.6.1.

  - Bump `node-fetch` to 2.6.1 - we were already resolving to 2.6.0
  - Run `yarn-deduplicate --packages node-fetch` in all 4 yarn.lock
  - Bump `cross-fetch` to 3.0.6 that has the latest version of `node-fetch`
  - Run `yarn-deduplicate --packages cross-fetch`
  - Bump `jest-fetch-mock` to 3.0.3 that has the latest version of node-fetch

  Unfortunately due to styled-components bring `fbjs` and an old version of `node-fetch` we had to force the resolutions in lot of places.

## 1.4.5

### Patch Changes

- [`59b23de10c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59b23de10c) - Exiting if no tests changed or added.

## 1.4.4

### Patch Changes

- [`b2972c1389`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2972c1389) - Add a script that computes changed or added tests since a commit.

## 1.4.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.4.2

### Patch Changes

- [`4a82823910`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a82823910) - Using changedPackages and filter packages for Jira branch deploy.

## 1.4.1

### Patch Changes

- [`78e52e2c54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78e52e2c54) - Allowing private packages to be displayed on staging Atlaskit site.

## 1.4.0

### Minor Changes

- [`394421d4f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/394421d4f0) - Change branch deploy package changeset detection to look only at what is on the current branch rather than comparing it to what is on master.

## 1.3.6

### Patch Changes

- [`e0b3fa9fd3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0b3fa9fd3) - Bumping `node-forge` to `0.10.0` to avoid vulnerability issue.
  Getting `node-forge` to `0.10.0` requires `patching` `httplease-asap`.

## 1.3.5

### Patch Changes

- [`5f7e534200`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f7e534200) - Move split bundle size packages script to TS + don't upload `build` & `monorepo-tooling` packages.

## 1.3.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.3.3

### Patch Changes

- [`4a8e2a8a80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a8e2a8a80) - Remove node cache if stale and add yarn lockfile linting to verify short circuit installs can occur

## 1.3.2

### Patch Changes

- [`7b2b95f514`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b2b95f514) - Upload to Statlas using a `POST`(we are now archiving `dists`, uploading it, then unpack) instead of doing a `PUT` request for each folder / files in `dists`. It prevents us to be rate limited by Statlas that allows 10 write request / min. In addition, we use `async-retry` in case there is an issue with Statlas API.
  Adding a s3 flag if there is a need to switch to the previous CDN.

## 1.3.1

### Patch Changes

- [`a41c6ecf8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a41c6ecf8e) - Fix run.package.if.changed.js not handling new changesets
- [`8395c67c72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8395c67c72) - Moving from S3 to Statlas.

## 1.3.0

### Minor Changes

- [`c141906084`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c141906084) - Add declarative entry points defined via the 'af:exports' field in package.json

## 1.2.8

### Patch Changes

- [`e0a66d6c8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0a66d6c8f) - Extend the Browserstack session to take into account the size of the queue.In addition, add resource restriction on custom build except for Landkid.

## 1.2.7

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 1.2.6

### Patch Changes

- [`b059536660`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b059536660) - A new command to trigger the design system docs build pipeline has been added. This is utilized in our website build.

## 1.2.5

### Patch Changes

- [`4beee6ef0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4beee6ef0e) - Update wait.for.browserstack.resources.js to support checking parallel session queues for both Automate and App Automate.

## 1.2.4

### Patch Changes

- [`6682b014c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6682b014c2) - Use async-retry instead of our own implementation.

## 1.2.3

### Patch Changes

- [`cf8f8d7feb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf8f8d7feb) - In this PR, we

  - remove the `run-bundle-size` step from the default branch.
  - trigger it from the `Building dists` step if the step is successful and the bundle size tools need to run.
  - as there is an issue in bitbucket where the latest build overwrites the `default branch build`, we post / push the `default branch build` pipeline link to the PR panel.

## 1.2.2

### Patch Changes

- [`e742d1bd2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e742d1bd2a) - In `@atlaskit/build-utils`, `updateBuildStatus` function is now converted in TS.
  In `@atlaskit/ci-scripts`, `update.build.status.with.netlify.link.js` is now `update-build-status.ts`:

  - It has been converted to TS.
  - It is now a standard CLI script not related to `Netlify` to update any build status.

## 1.2.1

### Patch Changes

- [`9d0c8ad13b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d0c8ad13b) - Removing the resolution for browserslist to avoid unwanted `upgrade` warning.

## 1.2.0

### Minor Changes

- [`a0e817bd72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0e817bd72) - Files in the 'storybook' directory or named 'example.tsx' will be excluded from build validation checks to allow storybook examples to be excluded from build

### Patch Changes

- Updated dependencies

## 1.1.31

### Patch Changes

- [`8fa1f3dc26`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8fa1f3dc26) - Script that validates the target branch of a PR depending on whether it includes changes to packages on scheduled releases.

## 1.1.30

### Patch Changes

- [`43f8ab2736`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43f8ab2736) - Remove the translation script as we added the `traduki-bot`.

## 1.1.29

### Patch Changes

- [`8a6bf45368`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a6bf45368) - Filtering the deleted files from the prettier run.

## 1.1.28

### Patch Changes

- [`04722f440f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04722f440f) - Our node scripts `get.changed.packages.since.base.branch.js` and `run.if.tool.changed` used with `--dependents='direct'` failed silently in CI when getting the dependency graph for `@atlaskit/docs`. The issue was related to packages without a "dependencies" field.

  The fix was to make sure we check for `dependencies` field to be there.

  In addition, our scripts were silently failing because these scripts are executed in sub shells that don’t always cause the parent shell to exit with failure. This [link](https://unix.stackexchange.com/questions/23026/how-can-i-get-bash-to-exit-on-backtick-failure-in-a-similar-way-to-pipefail) and this [one](https://stackoverflow.com/a/43221766/893630)suggests a way to workaround this by assigning subshells to the variable first.- Updated dependencies

## 1.1.27

### Patch Changes

- [`307b45c7a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/307b45c7a4) - Adding source ./build-setup.sh that was missing in pipelines and causing some issues when running the artifact pipe, hence failing some of the `yarn install` and did not send the website url.

## 1.1.26

### Patch Changes

- [`3299871990`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3299871990) - Auto-resolve yarn.lock merge conflicts as part of scheduled release auto merging

## 1.1.25

### Patch Changes

- [`b8e6472bc2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8e6472bc2) - Bump pipelines to use option size 4x.

## 1.1.24

### Patch Changes

- [patch][0e25f48ca6](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e25f48ca6):

  Restrict manual branch deploy to not run on master and develop.

## 1.1.23

### Patch Changes

- [patch][6b8aae1a48](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8aae1a48):

  AFP-1661:

  - Adding `bundlesize` to `tool.js` to extend `packageInfo` function and running the tool when needed.
  - Renaming the script `get.pkgs.in.team.js` to `split.pkgs.for.bundle.size.step.js`. Updated the script based on the `packageInfo` and extend `get.glob.packages.for.tools.js` to use `bundlesize`.

  The script `split.pkgs.for.bundle.size.step.js` now:

  - does not no longer use the `team` folder
  - gets all the packages that needs the bundle size tool to be run
  - split the array of packages based on the `BITBUCKET_PARALLEL_STEP`.- Updated dependencies [6b8aae1a48](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8aae1a48):
  - @atlaskit/build-utils@2.6.10

## 1.1.22

### Patch Changes

- [patch][41c92156e9](https://bitbucket.org/atlassian/atlassian-frontend/commits/41c92156e9):

  bundle size analytics use GASv3 with node-analytics-client

## 1.1.21

### Patch Changes

- [patch][db52fe5edf](https://bitbucket.org/atlassian/atlassian-frontend/commits/db52fe5edf):

  AFP-1674: Partial fix for OOM issue in CI by excluding `editor-test-helpers`.

## 1.1.20

### Patch Changes

- [patch][f9330efec7](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9330efec7):

  Small fix when using the `--dependents='direct'` flag and do not return it as a tool.

## 1.1.19

### Patch Changes

- [patch][e3a1d6b92d](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3a1d6b92d):

  Remove \$StringLitteral as we are no longer using //@flow

## 1.1.18

### Patch Changes

- [patch][63787f3327](https://bitbucket.org/atlassian/atlassian-frontend/commits/63787f3327):

  Initial implementation of the Codemod-cli- [patch][b91779317f](https://bitbucket.org/atlassian/atlassian-frontend/commits/b91779317f):

  Don't attempt to close master branch in merge.master.ts script

## 1.1.17

### Patch Changes

- [patch][0d4b96af1d](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d4b96af1d):

  Recently, we skipped CI `yarn build` step if no relevant packages have changed.

  However, we did not perform the same operations for the next steps included the check for :

  - the editor-mobile-bridge build step
  - the branch deploy step

  This previous change, actually broke the branch deploy step as if no packages change, it still requires packages to be built.

  Furthermore, the `run.if.package.changed script` was always defaulting to master branch even when a branch was tipped off develop, hence the `node build/ci-scripts/run.if.package.changed.js @atlaskit/editor-mobile-bridge -- yarn build:editor-mobile-bridge` will alwasy run even if the `editor-mobile-bridge` has not been touched.

  In addition, the change to make run.tool.if.changed dependents aware, broke the `toolNames` variable and was not returning the proper function to run the tool.

## 1.1.16

### Patch Changes

- [patch][5244e00425](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244e00425):

  Add runWebsite and expend run.tool.if.changed.js to check if a package changed needs to trigger a website build.- Updated dependencies [5244e00425](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244e00425):

  - @atlaskit/build-utils@2.6.9

## 1.1.15

### Patch Changes

- [patch][72eb99e88b](https://bitbucket.org/atlassian/atlassian-frontend/commits/72eb99e88b):

  Refactor getPackagesWithDependents in build/build-utils, refactor the script run.tool.if.changed to use meow and extend changed packages to dependents.- Updated dependencies [72eb99e88b](https://bitbucket.org/atlassian/atlassian-frontend/commits/72eb99e88b):

  - @atlaskit/build-utils@2.6.8

## 1.1.14

### Patch Changes

- [patch][3a82fd1d9f](https://bitbucket.org/atlassian/atlassian-frontend/commits/3a82fd1d9f):

  Script to upload PR metadata to package-ownership service and automatically add reviewers.

## 1.1.13

### Patch Changes

- [patch][6489b8a1f9](https://bitbucket.org/atlassian/atlassian-frontend/commits/6489b8a1f9):

  Adding a script in pipeline `node build/ci-scripts/run.tool.if.changed.js build -- yarn build` that checks if a package needs to be built.- Updated dependencies [6489b8a1f9](https://bitbucket.org/atlassian/atlassian-frontend/commits/6489b8a1f9):

  - @atlaskit/build-utils@2.6.6

## 1.1.12

### Patch Changes

- [patch][f3461e03aa](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3461e03aa):

  Remove Flow libraries

## 1.1.11

### Patch Changes

- [patch][8711955348](https://bitbucket.org/atlassian/atlassian-frontend/commits/8711955348):

  Script to use landkid for automatic merge of master into develop.- Updated dependencies [dae900bf82](https://bitbucket.org/atlassian/atlassian-frontend/commits/dae900bf82):

  - @atlaskit/build-utils@2.6.4

## 1.1.9

### Patch Changes

- [patch][0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):

  Introduce repository-internal techstack and Eslint plugin; extract utils

## 1.1.8

### Patch Changes

- [patch][b053602982](https://bitbucket.org/atlassian/atlassian-frontend/commits/b053602982):

  ## What has been fixed?

  - `yarn` using `npx yarn-deduplicate --packages yarn`
  - `lodash` using `npx yarn-deduplicate --packages lodash`
  - `dot-prop` by forcing the resolution - It is really hard to find another way to fix it.
  - `querystringify` by deduplicating original and resolve to the version that brings a secure querystringify.
  - `ms` is fixed using `npx yarn-deduplicate --packages debug`

## 1.1.7

### Patch Changes

- [patch][841c0d91c7](https://bitbucket.org/atlassian/atlassian-frontend/commits/841c0d91c7):

  Only branch deploy public @atlaskit packages

## 1.1.6

### Patch Changes

- [patch][135a227720](https://bitbucket.org/atlassian/atlassian-frontend/commits/135a227720):

  Fix broken ci-scripts yarn installs in pipelines caused by bumped build-utils dependency

## 1.1.5

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

## 1.1.4

### Patch Changes

- [patch][1ef9e161ff](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ef9e161ff):

  In Landkid(Custom build), the BITBUCKET_BRANCH environment variable is undefined. The logic for changed packages was defaulting to master branch, hence, running unnecessary packages and consuming resources.- Updated dependencies [1ef9e161ff](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ef9e161ff):

  - @atlaskit/build-utils@2.6.2

## 1.1.3

### Patch Changes

- [patch][3bc716e334](https://bitbucket.org/atlassian/atlassian-frontend/commits/3bc716e334):

  Update branch deploy to upload unarchived dist folder for mobile-bridge. Also add dir upload support to s3 upload script.

## 1.1.2

### Patch Changes

- [patch][1481770b3a](https://bitbucket.org/atlassian/atlassian-frontend/commits/1481770b3a):

  Refactor branch deploy scripts into single TS script

## 1.1.1

### Patch Changes

- [patch][6a22d73b24](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a22d73b24):

  Unignore typescript errors when building TS packages and add --strict flag to also unignore when building single packages

## 1.1.0

### Minor Changes

- [minor][ccbd1b390b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ccbd1b390b):

  - Update build tooling to:
    - Only build typescript packages with a `build/tsconfig.json` dir rather than any package with `tsconfig.json` in the root
    - Remove concept of cli packages with a `build/cli/tsconfig.json` and update them to use the standard build
    - Separate the typecheck and typescript build properties in `getPackageInfo` to allow typechecking our build packages without attempting to build them

### Patch Changes

- Updated dependencies [ccbd1b390b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ccbd1b390b):
  - @atlaskit/build-utils@2.6.0

## 1.0.7

### Patch Changes

- [patch][4156c2c34d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4156c2c34d):

  Update build with better watch mode that will push changes to linked repos. Also single dist type build option.

## 1.0.6

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 1.0.5

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 1.0.4

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 1.0.3

### Patch Changes

- [patch][43f66019ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/43f66019ee):

  Updates dependency on p-wait-for

## 1.0.2

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root
    Please see this [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points) for further details
