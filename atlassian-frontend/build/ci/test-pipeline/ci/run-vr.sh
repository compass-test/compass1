#!/bin/bash

# Shell script for running vr tests in CI that extracts repeated commands,
# keeps bitbucket-pipelines.yml concise and prevents the need for extra npm scripts

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="${DIR}/../../../.."

# Run only against changed packages
CHANGED="${CHANGED:-}"
# Run only against changed packages and their direct dependents
DEPENDENTS="${DEPENDENTS:-}"
# Run a single parallel chunk of tests
PARALLEL="${PARALLEL:-}"
# Generate snapshots for specific tests
SNAPSHOT="${SNAPSHOT:-}"
# Run against these specific files only
TEST_FILES="${TEST_FILES:-}"
# Run specific files a certain number of times
REPETITIONS="${REPETITIONS:-}"
# Trigger a dynamic parallel tests pipeline
PARALLEL_TRIGGER="${PARALLEL_TRIGGER:-}"

# Enable test caching - used in blocks where we don't run tests straight away such as CHANGED and DEPENDENTS
CACHED=false

# Returns the cached flag if the $CACHED env var has been set
function get_cached_flag() {
  if [[ "$CACHED" == true ]]; then
    echo "--cached"
  fi
}

function run() {
  local CACHED_FLAG
  CACHED_FLAG="$(get_cached_flag)"
  # git lfs pull only works from the root in CI
  cd "$ROOT_DIR" && git lfs pull
  # $CACHED_FLAG must not be wrapped in quotes to prevent adding a trailing '' which runs all tests
  cd "$DIR" && yarn test:vr "$@" $CACHED_FLAG
  exit
}

function run_parallel() {
  local CACHED_FLAG
  CACHED_FLAG="$(get_cached_flag)"
   # git lfs pull only works from the root in CI
  cd "$ROOT_DIR" && git lfs pull
  # $CACHED_FLAG must not be wrapped in quotes to prevent adding a trailing '' which runs all tests
  cd "$DIR" && yarn test-parallel:vr "$@" $CACHED_FLAG
  exit
}

if [[ -n $CHANGED ]]; then
  export CHANGED_PACKAGES
  CHANGED_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js)
  CACHED=true
elif [[ -n $DEPENDENTS ]]; then
  export CHANGED_PACKAGES
  CHANGED_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --exclude='editor-test-helpers' --dependents='direct')
  CACHED=true
fi

if [[ -n $PARALLEL ]]; then
  if [[ -n "$TEST_FILES" && -n "$REPETITIONS" ]]; then
    # If `TEST_FILES` is specified it will run the tests multiple times in parallel.
    # Don't wrap $TEST_FILES in quotes so that each file is its own arg entry
    run "$@" --repeat="${REPETITIONS}" $TEST_FILES
  else
    # Otherwise run all tests in parallel chunks
    export TMPFILE; TMPFILE=$(mktemp /tmp/jest-vr.XXXXXX)
    # Set --cached in the test file list generation to make parallel tests run only for untested packages
    (cd "$DIR" && YARN_SILENT=true yarn test:vr --listTests --json > "$TMPFILE")
    export STEPS; STEPS=$BITBUCKET_PARALLEL_STEP_COUNT
    export STEP_IDX; STEP_IDX=$BITBUCKET_PARALLEL_STEP
    export PARALLELIZE_TESTS_FILE; PARALLELIZE_TESTS_FILE="$TMPFILE"
    run "$@"
  fi
elif [[ -n $SNAPSHOT ]]; then
  if [[ -z "$TEST_FILES" ]]; then
    echo "You need to pass path to the test / package you want the snapshot to be generated!"
    exit 1
  fi
  run "$@" -u $TEST_FILES
elif [[ -n $PARALLEL_TRIGGER ]]; then
  run_parallel "$@" --cached
else
  run "$@"
fi
