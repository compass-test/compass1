#!/bin/bash

# Shell script for running unit tests in CI that extracts repeated commands,
# keeps bitbucket-pipelines.yml concise and prevents the need for extra npm scripts

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="${DIR}/../../../.."

# Run only against changed packages
CHANGED="${CHANGED:-}"
# Run a single parallel chunk of tests
PARALLEL="${PARALLEL:-}"
# DEPRECATED - Obsolete, kept around to prevent breaking older branches that haven't rebased
STORE_CACHE_ONLY="${STORE_CACHE_ONLY:-}"
# Trigger a dynamic parallel tests pipeline
PARALLEL_TRIGGER="${PARALLEL_TRIGGER:-}"
# Enable test caching - default to false, we override it when we want to enable caching
CACHED=false

# Returns the cached flag if the $CACHED env var has been set
function get_cached_flag() {
  if [[ "$CACHED" == true ]]; then
    echo "--cached"
  fi
}

function run() {
  local CACHED_FLAG="$(get_cached_flag)"
  # $CACHED_FLAG must not be wrapped in quotes to prevent adding a trailing '' which runs all tests
  cd "$DIR" && yarn test --maxWorkers=50% "$@" $CACHED_FLAG
  exit
}

function run_parallel() {
  local CACHED_FLAG="$(get_cached_flag)"
  # $CACHED_FLAG must not be wrapped in quotes to prevent adding a trailing '' which runs all tests
  cd "$DIR" && yarn test-parallel --maxWorkers=50% "$@" $CACHED_FLAG
  exit
}

if [[ -n $CHANGED ]]; then
  export CHANGED_PACKAGES
  CHANGED_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js)
  export COVERAGE_PACKAGES
  COVERAGE_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.code.threshold.for.changed.packages.since.base.branch.js)
  CACHED=true
fi

if [[ -n $PARALLEL ]]; then
  export TMPFILE; TMPFILE=$(mktemp /tmp/jest.XXXXXX)
  (cd "$DIR" && YARN_SILENT=true yarn test --listTests --json > "$TMPFILE")
  export PARALLELIZE_TESTS_FILE; PARALLELIZE_TESTS_FILE="$TMPFILE"
  # Use STEPS and STEP_IDX vars if passed in, else default to bitbucket pipeline variables
  export STEPS; STEPS="${STEPS:-$BITBUCKET_PARALLEL_STEP_COUNT}"
  export STEP_IDX; STEP_IDX="${STEP_IDX:-$BITBUCKET_PARALLEL_STEP}"
  # We don't add the --cached flag when running in parallel as the cache filtering has already occurred in the job that triggered
  # this pipeline
  run "$@"
elif [[ -n $PARALLEL_TRIGGER ]]; then
  CACHED=true
  # Triggering parallel tests uses a different top-level script, so call it and then exit early
  run_parallel "$@"
elif [[ -n $STORE_CACHE_ONLY ]]; then
  # Old flag - kept around to prevent breaking older branches. To be removed later
  exit 0
else
  run "$@"
fi


