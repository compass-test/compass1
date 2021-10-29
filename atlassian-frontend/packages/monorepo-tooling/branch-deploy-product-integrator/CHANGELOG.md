# @atlaskit/branch-deploy-product-integrator

## 5.7.2

### Patch Changes

- Updated dependencies

## 5.7.1

### Patch Changes

- [`3f0d0336c1b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f0d0336c1b) - - We do a `shallow` clone only for the first commit then clone the full repository for any subsequent commit.
  - We can now use `--overrideCommit` flag to the `clone-product-repo` command to checkout a particular commit in the products. Those commits will be stored as environment variables. Look for `CONFLUENCE_INTEGRATOR_OVERRIDE_COMMIT` and `JIRA_INTEGRATOR_OVERRIDE_COMMIT` in the repository settings.

## 5.7.0

### Minor Changes

- [`2eae631190a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2eae631190a) - Add a `--shallow` flag to the clone product repo script.

## 5.6.33

### Patch Changes

- Updated dependencies

## 5.6.32

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 5.6.31

### Patch Changes

- [`669eee81d22`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669eee81d22) - Allow base branch to overriden

## 5.6.30

### Patch Changes

- [`a02a6ab32e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a02a6ab32e9) - We now use a full bolt install to upload the build status instead of the ci scripts work around.

## 5.6.29

### Patch Changes

- [`02ea742e67a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02ea742e67a) - Added a function that returns the running product builds urls and upload the `in-progress` status after the product build is triggered.
  This was added to avoid the use case where `Bamboo` encounters an infra issue and do not properly post / upload the build status to the pull request in `Atlassian Frontend`.

## 5.6.28

### Patch Changes

- [`d4c254c4851`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4c254c4851) - - Add `/constants` as an entrypoint in `@atlaskit/branch-deploy-product-integrator`.
  - Use the `/constants` entrypoint in `af-release-dashboard`.

## 5.6.27

### Patch Changes

- [`80abc1ec1e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80abc1ec1e7) - remove experimental-bulk-integration package

## 5.6.26

### Patch Changes

- [`f4f08359992`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4f08359992) - Add capability to run codemods on Jira codebase. It will not fail on error for now.

## 5.6.25

### Patch Changes

- [`5244523cd0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244523cd0c) - - Only `branch-deploy` `editor-mobile-bridge` to s3 and other packages use by default the private registry.
  - Refactored `product integrator` to use private registry by default.
  - Remove `branch installer` package that is now obsolete and update DAC docs.

## 5.6.24

### Patch Changes

- [`79bb4fe31e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79bb4fe31e3) - Running codemods on ts, tsx and js files using tsx parser.

## 5.6.23

### Patch Changes

- [`af6e9d4eab2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af6e9d4eab2) - Make confluence build gating and removed all the code related to the Confluence Cypress Build.

## 5.6.22

### Patch Changes

- [`5f455333df0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f455333df0) - Add a script to send product integrator data from Bitbucket pipelines to `af-product-integration` service.

## 5.6.21

### Patch Changes

- [`2b432379666`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b432379666) - Add a suffix [OPT] to Confluence and Jira build.

## 5.6.20

### Patch Changes

- [`e0b29a542c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0b29a542c5) - Add 2 utility functions to convert ``@atlassiansox/`to`@atlassian/not-sox`and vice-versa. Update logic in`InstallFromCommit`to take into account`sox`packages for`Confluence`&`Jira`.

## 5.6.19

### Patch Changes

- [`8fc0e3dfd7f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8fc0e3dfd7f) - Add `dedupe: true` for Confluence when running the product integrator.

## 5.6.18

### Patch Changes

- Updated dependencies

## 5.6.17

### Patch Changes

- [`5bdd0ea1d67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bdd0ea1d67) - Add a script to add the forked build status.

## 5.6.16

### Patch Changes

- [`bdd159c6cb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd159c6cb8) - Remove unused code, dependencies and replace by the new product integrator logic.

## 5.6.15

### Patch Changes

- [`cfd7c0b5bcc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfd7c0b5bcc) - Update the logic to properly check for the env var FAIL_CODEMODS_ON_ERROR and add `--no-babel` when running js file.

## 5.6.14

### Patch Changes

- [`2c68f9d809e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c68f9d809e) - - Specify the correct parser based on ts/tsx file extension to prevent errors and files being skipped.
  - Add back the logic to branch deploy packages that are only installed in products.

## 5.6.13

### Patch Changes

- [`4dea9a65036`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4dea9a65036) - Add an env var FAIL_CODEMODS_ON_ERROR to control better failing codemod. The goal is to make it gating.

## 5.6.12

### Patch Changes

- [`28d2bf75618`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28d2bf75618) - Add a function to delete patch packages in product.

## 5.6.11

### Patch Changes

- [`39396c252bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39396c252bc) - Add additional commands to config in case we need to run extra commands in the product integrator.

## 5.6.10

### Patch Changes

- [`de219710238`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de219710238) - Moving bamboo utils to build utils in preparation of the bamboo cli tool.

## 5.6.9

### Patch Changes

- [`3c9b461e68d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c9b461e68d) - Remove unused code, improve deployment and replace by the new product integrator logic.

## 5.6.8

### Patch Changes

- [`a9e359236b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9e359236b4) - The codemod-cli can fail on error when the flag `--fail-on-error` is passed, it will return a 1 exit code when errors were found during execution of codemods
  This flag `--fail-on-error` was added as part of this [PR](https://github.com/facebook/jscodeshift/pull/416) that forked `jscodeshift`.
  In Atlassian Frontend, we are now using the fork of `jscodeshift`, [atlassian-forks-jscodeshift](https://www.npmjs.com/package/atlassian-forks-jscodeshift) till we get this change back to the library.

  Add `--fail-on-error` in the config to be passed as a flag when the codemod runs - only for branch integrator.

- Updated dependencies

## 5.6.7

### Patch Changes

- [`de81193cdf3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de81193cdf3) - Refactor clone-product-repo.ts to avoid the env var to throw errors.

## 5.6.6

### Patch Changes

- [`c46bcb4bac2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c46bcb4bac2) - Refactor clone-product-repo.ts to avoid the env var to throw errors.

## 5.6.5

### Patch Changes

- [`092aa77e8e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/092aa77e8e4) - Adding the capability to run product integrator from bitbucket pipeline.

## 5.6.4

### Patch Changes

- [`be5f47d2258`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be5f47d2258) - Use old npm url to work around artifactory issue

## 5.6.3

### Patch Changes

- Updated dependencies

## 5.6.2

### Patch Changes

- [`86a6a8562a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/86a6a8562a) - Make the snapshot registry the default for the branch deploy integrator

## 5.6.1

### Patch Changes

- [`5a5cee2d2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a5cee2d2a) - - Adding a script to 'branch-deploy' folder to detect if a PR targets develop. If a PR targets develop, it will start the Cypress confluence build.
  - Adding the `atlaskitBranchName` as metadata to the `.atlaskitVersion` to be able to read the branch name in the Cypress confluence build.
  - Add a shell script to trigger the cypress fork.

## 5.6.0

### Minor Changes

- [`5f2c0c88e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f2c0c88e5) - Upgraded yarn-deduplicate and added new snapshot registry to branch deploy tooling

### Patch Changes

- Updated dependencies

## 5.5.10

### Patch Changes

- [`4a82823910`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a82823910) - Using changedPackages and filter packages for Jira branch deploy.

## 5.5.9

### Patch Changes

- [`2eb794385d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2eb794385d) - Batch installs 20 at a time

## 5.5.8

### Patch Changes

- [`f291eeb6af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f291eeb6af) - Adds support for running the codemod command multiple times with different flags.

## 5.5.7

### Patch Changes

- [`8ff6bd72c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ff6bd72c6) - Update the Jira list for packages.

## 5.5.6

### Patch Changes

- [`55eea95c0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/55eea95c0c) - Jira does not need to dedupe and adding packages to the config.
  Remove groovy files as now we are using `.yaml` stored in `bamboo-specs`.

## 5.5.5

### Patch Changes

- [`e268e6e0cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e268e6e0cb) - Increase integrator timeout and max retries to reduce flakiness

## 5.5.4

### Patch Changes

- [`f00c4c66e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f00c4c66e7) - Dont run commit verify after codemods

## 5.5.3

### Patch Changes

- [`d296f173e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d296f173e9) - Increase integrator timeout and max retries to reduce flakiness

## 5.5.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 5.5.1

### Patch Changes

- [`e9d29f0571`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9d29f0571) - Fix issue with integrator not resetting package.jsons back to the correct version of master which could result in references to non-existing packages that break bolt install

## 5.5.0

### Minor Changes

- [`668bb06bed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/668bb06bed) - Add support for Jira independent upgrades

### Patch Changes

- Updated dependencies

## 5.4.0

### Minor Changes

- [`d5219b8ad8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5219b8ad8) - Automatically run codemods for upgraded packages

### Patch Changes

- Updated dependencies

## 5.3.2

### Patch Changes

- Updated dependencies

## 5.3.1

### Patch Changes

- [`2199dd9188`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2199dd9188) - Avoid overwriting manual changes that have been pushed since the CLI started

## 5.3.0

### Minor Changes

- [`39689055f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39689055f9) - Make rebase the default branch model

## 5.2.0

### Minor Changes

- [`bd4208ee4d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd4208ee4d) - Add check-packages command that will print out the number of packages that would be installed in a product

## 5.1.0

### Minor Changes

- [`644684dd31`](https://bitbucket.org/atlassian/atlassian-frontend/commits/644684dd31) - Add rebase branching model to integrator behind a flag that will rebase installs on top of latest product master rather than merge. If manual commits are detected on the product mirrored branch, it will not rebase but still continue to install subsequent changes rather than aborting.

## 5.0.5

### Patch Changes

- [`95afa6f332`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95afa6f332) - AFP-1783 Disable integrity check in the yarnrc before trying to do anything else

## 5.0.4

### Patch Changes

- Updated dependencies

## 5.0.3

### Patch Changes

- [patch][b365339053](https://bitbucket.org/atlassian/atlassian-frontend/commits/b365339053):

  Improve branch install logging for bolt package engines by using --no-prefix

## 5.0.2

### Patch Changes

- [patch][930663af6a](https://bitbucket.org/atlassian/atlassian-frontend/commits/930663af6a):

  Abort integration if no packages will be installed in product- Updated dependencies [76534ac18a](https://bitbucket.org/atlassian/atlassian-frontend/commits/76534ac18a):

  - @atlaskit/branch-installer@0.3.4

## 5.0.1

### Patch Changes

- Updated dependencies [b81c93b6f6](https://bitbucket.org/atlassian/atlassian-frontend/commits/b81c93b6f6):
  - @atlaskit/scheduled-releases@0.2.0

## 5.0.0

### Major Changes

- [major][928340a394](https://bitbucket.org/atlassian/atlassian-frontend/commits/928340a394):

  Make package private. We only consume this from within the repo itself and want to reuse other private build scripts

## 4.1.1

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/branch-installer@0.3.3

## 4.1.0

### Minor Changes

- [minor][7d24cde253](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d24cde253):

  Add dedupeStrategy flag and update dedupe to run package engine after deduping to resolve issues where s3 versions of package do not dedupe properly

## 4.0.0

### Major Changes

- [major][1a7c4ee512](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a7c4ee512):

  Improve merge conflict resolution support.

  Breaking changes:

  - Default value of `--cmd` flag is now `add`. This aligns with what is used for our integrator builds. `add` prevents unnecessary upgrading of transitive deps.
  - Move existing behaviour behind a `--ci` flag and introduce some changes when executing without it (manual mode):
    - Enforces the integrated branch exists rather than creating a new one.
      This prevents incorrect/typo'd branch names from being created.
    - Waits for unresolved merge conflicts to be fixed manually
    - Uses the existing git user as the commit author rather than trying to
      fetch the author email from the corresponding commit from atlassian-frontend
    - Does not attempt to trigger product CI, even if productCiPlanUrl is
      passed
  - Remove unused `report-status` subcommand

  Features:

  - Add `--no-push` flag to disable pushing commits at the end of the `push` command

  Fixes:

  - Fix merge/reset errors that arise when a workspace has been deleted in product's master branch
  - Fix subcommand validation errors not reporting subcommand usage.

## 3.0.0

### Major Changes

- [major][45bde03b5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/45bde03b5a):

  Replace PRODUCT_CI basic auth env vars with PRODUCT_CI_TOKEN that uses JWT authentication

## 2.1.0

### Minor Changes

- [minor][8bbd206200](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bbd206200):

  Upgrade branch-deploy-product-integrator cli to work with atlassian-frontend repo.

  Since the atlassian-frontend repo is private and therefore requires authentication for its rest API, we now
  fetch the commit author from the checked out copy of atlassian-frontend.

## 2.0.4

### Patch Changes

- [patch][2e3bdf4b42](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e3bdf4b42):

  Add commit hash to auto-gnerated commit message

## 2.0.3

### Patch Changes

- [patch][917c865a2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/917c865a2a):

  Meow is smarter than I thought and also converts "" to a boolean true, so had to add a typeof check

## 2.0.2

### Patch Changes

- [patch][ef95dce44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef95dce44d):

  Add some extra url checks- [patch][89cbaaf5a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89cbaaf5a2):

  Add a length check to productCiPlanUrl

## 2.0.1

### Patch Changes

- [patch][6195035473](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6195035473):

  Update integrator to merge with master and reset package.json/yarn.lock with master.
  This fixes two issues:

  1. Branch becoming out of date with master
  2. Stale branch deploys of packages lingering in package.json when those packages are not in the latest branch deploy

## 2.0.0

### Major Changes

- [major][756b40834f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/756b40834f):

  - The branch-deploy-product-integrator now has sub-commands to allow further commands in the future such as reporting build statuses.

    The default behaviour now resides under the `push` command and has some API changes of itself.

    The two mandatory `atlaskitBranchName` and `atlaskitCommitHash` flags are now positional arguments.

    Changes:

    Old: `branch-deploy-product-integrator --atlaskitBranchName foo --atlaskitCommitHash abcdefg --cmd add`
    New: `branch-deploy-product-integrator push foo abcdefg --cmd add`

### Minor Changes

- [minor][48f9d44824](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48f9d44824):

  - The `push` command will now add a `.atlaskit-version` file to product repos with information pertaining to the atlaskit commit that was branch deployed. Currently it contains the atlaskit commit hash. This aids in linking branch deploys in products back to atlaskit commits.

### Patch Changes

- [patch][cafc62d2e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cafc62d2e4):

  Don't trigger product CI if no changes were committed. This prevents an issue where a product CI branch build is created when a git branch hasn't been created

## 1.3.0

### Minor Changes

- [minor][f957c2117c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f957c2117c):

  Add --productCiPlanUrl flag that will create a branch build in product for the branch if one has not already been created. This is required for triggering builds on product CIs that are configured to only create branch builds when a PR has been created.
  Add extra validation to throw when mandatory flags aren't passed or when any unsupported flags are passed.

## 1.2.0

### Minor Changes

- [minor][9bb012c1c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bb012c1c9):

  Replace slashes with dashes in branch name created in products. This ensures certain product integrations don't fail while allowing Atlaskit branche names to have slashes.

## 1.1.0

### Minor Changes

- [minor][5344193efa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5344193efa):

  Add support for passing arbitrary flags to the branch install command, i.e. yarn/bolt, by adding the flags after a '--' separator

## 1.0.5

### Patch Changes

- [patch][0ed6b4e90c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ed6b4e90c):

  Expose cmd and add a retry to the upgrade

## 1.0.4

- Updated dependencies [4dc307b4f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4dc307b4f9):
  - @atlaskit/branch-installer@0.2.0

## 1.0.3

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 1.0.2

### Patch Changes

- [patch][f5a3c7e7b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5a3c7e7b9):

  CLI's should return a non-zero return code when a error was thrown

## 1.0.1

### Patch Changes

- [patch][a955d95ac4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a955d95ac4):

  Added option to run yarn dedupe at the end

## 1.0.0

### Major Changes

- [major][348b1058fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/348b1058fd):

  First version of branch deploy integrator cli
