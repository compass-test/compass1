#!/usr/bin/env bash

# activating the script installed by the sidecar
source .artifactory/activate.sh

# LFS has the batch mode for downloading files from a server.
# But it does not work on clone and checkout due to limitation of git’s smudge filters.
# As only visual regression steps are using the images, we can skip LFS’s smudge filter and fetch LFS objects on demand.
echo -e "\e[32m  Setting git lfs configs..."
git config filter.lfs.smudge "git-lfs smudge --skip %f"
git config filter.lfs.process "git-lfs filter-process --skip"
git lfs env

# We fetch and checkout master here so that we have a local reference to "master" in other commands
# (avoids the "ambiguous argument 'master': unknown revision or path not in the working tree" error)
echo -e "\e[32m  Fetching master so that we have a reference to it..."
git fetch origin master
git checkout master # (master doesn't exist until we do this checkout)
git checkout -

echo -e "\e[32m  Fetching develop so that we have a reference to it..."
git fetch origin develop
git checkout develop # (develop doesn't exist until we do this checkout)
git checkout - # checks out the previous ref

# These are used to sign commits when pushing back to Bitbucket
# No auth is required as we use ssh from pipelines instead
echo -e "\e[32m  Setting git user configs..."
git remote set-url origin "$BITBUCKET_GIT_SSH_ORIGIN"
git config --global user.email "$BOT_ACCOUNT_EMAIL"
git config --global user.name "$BOT_ACCOUNT_NAME"
git config --global push.default simple

echo -e "\e[32m  Setting npm registry token"
# $NPM_TOKEN is the auth token for the "atlaskit" user
npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN
# For some reason, the npm dist-tag commands are hitting yarnpkg and not npmjs
npm set //registry.yarnpkg.com/:_authToken=$NPM_TOKEN


echo -e "\e[32m  Setting Yarn registry and token"
yarn config set _authToken $NPM_TOKEN
yarn config set registry https://registry.npmjs.org/

# Forces `chalk` to display colored output in pipelines
export FORCE_COLOR=1
yarn config set color always


# NOTE! We *VERY* deliberately don't run config lists in here as they will expose private tokens!
# Do _NOT_ re-enable them
# yarn config list
# npm config list

# Automatically pull the cache unless we are passed the `--no-cache` flag
if [[ $* != *--no-cache* ]]; then
    ./build/ci/instant-scripts/ci-cache.sh pull-and-extract
fi

# Only use node cache if it matches the yarn.lock file exactly
echo "Checking for stale node cache"
build/legacy/ci-scripts/remove-node-cache-if-stale.sh
