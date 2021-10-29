#!/bin/bash

# Shell script for running webdriver tests in CI that extracts repeated commands,
# keeps bitbucket-pipelines.yml concise and prevents the need for extra npm scripts

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="${DIR}/../../../.."

CHANGED="${CHANGED:-}"
DEPENDENTS="${DEPENDENTS:-}"
PARALLEL="${PARALLEL:-}"
TEST_FILES="${TEST_FILES:-}"

function run() {
  # Run desktop integration tests on browserstack automate
  # Pass through any arguments to the browserstack npm script
  cd "$DIR" && LOCAL_IDENTIFIER=$(date +%s) yarn test:webdriver:browserstack "$@"
  exit
}

# Fetch latest beta browsers from browserstack
(cd "${DIR}/../../../test-utils/webdriver-runner" && yarn get-browserstack-beta-browsers) | tee beta-browsers.txt
export BETA_BROWSERS; BETA_BROWSERS=$(sed -n 3p beta-browsers.txt)

if [[ -n $CHANGED ]]; then
  export CHANGED_PACKAGES
  CHANGED_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --exclude='editor-test-helpers')
  run "$@" --cached
elif [[ -n $DEPENDENTS ]]; then
  export CHANGED_PACKAGES
  CHANGED_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --exclude='editor-test-helpers' --dependents='direct')
  run "$@" --cached
elif [[ -n $PARALLEL ]]; then
  # Check for resources
  (cd "${DIR}/../../../test-utils/webdriver-runner" && BS_SESSIONS_ALLOWED=60 yarn get-browserstack-resources)
  if [[ -n "$TEST_FILES" ]]; then
    # If `TEST_FILES` is specified it will run the tests multiple times in parallel.
    # Don't wrap $TEST_FILES in quotes so that each file is its own array entry
    run "$@" $TEST_FILES
  else
    # Otherwise run all tests in parallel chunks
    export TMPFILE; TMPFILE=$(mktemp /tmp/jest-wd.XXXXXX)
    (cd "$DIR" && YARN_SILENT=true yarn test:webdriver --listTests --json > "$TMPFILE")
    export STEPS; STEPS=$BITBUCKET_PARALLEL_STEP_COUNT
    export STEP_IDX; STEP_IDX=$BITBUCKET_PARALLEL_STEP
    export PARALLELIZE_TESTS_FILE; PARALLELIZE_TESTS_FILE="$TMPFILE"
    run "$@"
  fi
else
  run "$@"
fi
