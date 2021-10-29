#!/usr/bin/env bash

# This script expects to be run from the root of the repo
# source ./build/ci/instant-scripts/landkid-setup.sh

export IS_LANDKID_BUILD=true

rebase() {
  git fetch origin $TARGET_BRANCH && git checkout $TARGET_BRANCH && git checkout - && git merge $TARGET_BRANCH --no-edit

  for COMMIT in $(echo $LANDKID_DEPENDENCY_COMMITS | tr -d '"[]' | sed "s/,/ /g")
  do
    git merge $COMMIT --no-edit
  done
}

source ./build-setup.sh --no-cache

set -euxo pipefail

# Rebase on master and dependency commits unless we are passed the `--no-rebase` flag
if [[ $* != *--no-rebase* ]]; then
  rebase
fi

# Rebasing can cause changes to yarn.lock so we pull the cache here instead of during build-setup
./build/ci/instant-scripts/ci-cache.sh pull-and-extract
