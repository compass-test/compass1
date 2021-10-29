const fs = require('fs');
const meow = require('meow');
const path = require('path');
const groupBy = require('lodash/groupBy');

const packages = require('@atlaskit/build-utils/packages-old');

// /**
//  * NOTE: This prints the list of changed packages and dependent packages since master or develop ONLY if they have been commited.
//  * It will print them all out as a json array of relative paths
//  * i.e: $ node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js
//  *        ["packages/design-system/avatar", "packages/design-system/badge"]
//  * */

const cli = meow(
  `
    Usage
      $ node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js

    Options
      --base                                 Explicitly set the base branch and override the automatic base branch detection
      --dependents='direct'                  Include "direct" dependent packages.
      --spaceDelimited                       Change the output of changed packages script from an array to a space delimited output.
      --only='packages'                      Target only 'packages' folder name, this flag is mostly used with 'bolt measure', the bundle size tool.
      --releaseModel={continuous,scheduled}  Filter packages to those that follow a particular release model.
      --exclude='monorepo-tooling'           Exclude folders or packages, this flag is mostly used with 'bolt measure', the bundle size tool.

    Examples
      $ node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --dependents='direct'

      $ node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --spaceDelimited --only='packages'

      $ node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --base master
      `,
  {
    description:
      'Display an array of changed packages since base branch (master or develop)',
    flags: {
      base: {
        type: 'string',
      },
      dependents: {
        type: 'string',
      },
      spaceDelimited: {
        type: 'boolean',
      },
      only: {
        type: 'string',
      },
      releaseModel: {
        type: 'string',
      },
      exclude: {
        type: 'string',
      },
    },
  },
);

const displayChangedPackagesSinceBaseBranch = async flags => {
  // `BITBUCKET_BRANCH` is an env variable BB pipelines setup BUT it is undefined when used in a custom build.
  // `TARGET_BRANCH` is an env variable defined in pipelines by this script TARGET_BRANCH="$(node build/legacy/ci-scripts/get.target.branch.js)".
  const {
    BITBUCKET_BRANCH,
    TARGET_BRANCH,
    BITBUCKET_PR_DESTINATION_BRANCH,
  } = process.env;

  // `BITBUCKET_PR_DESTINATION_BRANCH` is only defined in `pull-request` build
  // but as we recently moved the webdriver tests to run in this build,
  // we could use this env var to overrides `TARGET_BRANCH`.
  const targetBranch =
    flags.base || BITBUCKET_PR_DESTINATION_BRANCH || TARGET_BRANCH;

  // Changed packages that have been worked on since master.

  // Running `custom builds` such as Landkid returned BITBUCKET_BRANCH as undefined. In this case,
  // the function will use `baseBranchOverride` in `getChangedPackages` but will default to `master`,
  // if we don't specify the TARGET_BRANCH setup in CI.
  const changedPackages = await packages.getChangedPackages(
    BITBUCKET_BRANCH,
    targetBranch,
  );
  let changedPackagesRelativePaths = changedPackages.map(
    pkg => pkg.relativeDir,
  );

  // Packages that are dependent on the changed packages.
  // If dependencies flag is passed, CHANGED_PACKAGES will return packages that are dependent on the changed packages.
  if (flags.dependents) {
    changedPackagesRelativePaths = await packages.getChangedPackagesWithDependents(
      changedPackages,
      flags.dependents,
    );
  }

  // Those exceptions scripts are related to the measure of the bundle size.
  // This check if the `--only='folderName'` or `--only='foo,bar'` flag is set when using the measure tool.
  // This will filter the changed packages to only returned, the package(s) included in the folder or package path(s).
  // For example, if we need to `only` include the folder 'packages' when measuring the package bundle size.
  if (flags.only) {
    const includedPattern = flags.only;
    if (includedPattern.includes(',')) {
      // Array based CSV string pattern matching
      const includedPatterns = includedPattern.split(',');
      changedPackagesRelativePaths = changedPackagesRelativePaths.filter(pkg =>
        includedPatterns.some(pattern => pkg.includes(pattern)),
      );
    } else {
      // String pattern matching
      changedPackagesRelativePaths = changedPackagesRelativePaths.filter(pkg =>
        pkg.includes(includedPattern),
      );
    }
  }

  // Those exceptions scripts are related to the measure of the bundle size.
  // This check if the `--exclude='folderName'` flag is set when using the measure tool.
  // This will filter the changed packages to exclude the packages matching the folder or package path.
  // For example, if we need to `exclude` the folder 'monorepo-tooling' when measuring the package bundle size.
  if (flags.exclude) {
    const excludePatterns = flags.exclude.split(',');
    changedPackagesRelativePaths = changedPackagesRelativePaths.filter(
      relativePath =>
        !excludePatterns.some(excludePattern =>
          relativePath.includes(excludePattern),
        ),
    );
  }

  if (flags.releaseModel) {
    if (
      flags.releaseModel !== 'continuous' &&
      flags.releaseModel !== 'scheduled'
    ) {
      throw new Error(`Unknown release model ${flags.releaseModel}`);
    }

    changedPackagesRelativePaths =
      groupBy(changedPackagesRelativePaths, packagePath => {
        const packageJson = JSON.parse(
          fs.readFileSync(path.join(packagePath, 'package.json')),
        );

        return packageJson.atlassian == null
          ? 'unknown'
          : packageJson.atlassian.releaseModel;
      })[flags.releaseModel] || [];
  }

  // This check is only for the way of changed packages output is displayed:
  // '--spaceDelimited' - using the measure tool, will return the changedPackages
  // like 'packages/design-system/button packages/editor/editor-core ...'.
  // Otherwise, the standard output will be ["packages/design-system/button", "packages/editor/editor-core", ...].
  if (flags.spaceDelimited) {
    console.log(changedPackagesRelativePaths.join(' '));
  } else {
    console.log(JSON.stringify(changedPackagesRelativePaths));
  }
};

displayChangedPackagesSinceBaseBranch(cli.flags).catch(e => {
  console.error(e);
  process.exit(1);
});
