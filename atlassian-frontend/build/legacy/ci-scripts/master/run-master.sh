#!/bin/bash

###########################################################################
## This is the CI script that runs the master build. This scripts build, ##
## release and deploy packages / services.                               ##
## This scripts assumes that it runs at the root of the repo.            ##
###########################################################################

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

([[ "$BITBUCKET_BRANCH" == "master" ]]) || (echo "This build should only be run on master" && exit 1)

bolt install --frozen-lockfile

# Note: Some of the packages store their assets in `git-lfs` and we need to pull those assets to make sure their packages are properly built.
git lfs pull --include "**/packages/**/*.svg, **/packages/**/*.png, **/repo-docs/**/*.png" --exclude="**/__image_snapshots__/*.png"

if ! yarn changeset:raw status; then echo "No packages to release, exiting build" && exit 0; fi

# If this kicked off by release, will tag that release.
yarn ts-node build/legacy/ci-scripts/tag-release-commit.ts

# This script will automatically end a master build if another master build is already running.
(cd build/legacy/ci-scripts && yarn stop-if-older-build)

# We generate metadata for all services to be deployed from master uses changesets and service config.
bolt w @af/service-deployments generate-metadata

# Rename unversioned codemods before release - should be executed before yarn changeset version.
bolt w @atlaskit/ci-scripts replace-codemod-versions

# Bump all packages and their dependents using saved changesets.
./build/dev/changesets/ci/version.sh

# build all distTypes in master: This is very, very slow - in future, would be good to build only packages we need
# ideally: cjs+esm+es2019 for packages to publish and cjs only for dependencies of those.
yarn build

# We push the bumped packages to master now as it's much better to fail whilst BB is ahead of npm, than the other way round.
# Gracefully exit if master has updated during the build.
git fetch origin master
NEW_MASTER_COMMITS="$(git rev-list --no-merges --abbrev-commit HEAD..origin/master)"
if [[ "$NEW_MASTER_COMMITS" != "" ]]; then
 echo "Exiting and skipping publish as master branch has updated"
 exit 0
fi
git push

bolt w @af/service-deployments trigger-master-deployments
# Because we distribute precompiled code for mobile, for version accuracy, it needs to be built after the bump.
# Unfortunately, we can't rely on `run.if.package.changed.js` here because it runs against the last commit,
# which contains our changeset bump rather than the actual changes.
yarn build:editor-mobile-bridge

# Release all unreleased packages.
yarn changeset publish

git push --tags # Push only the tags.
