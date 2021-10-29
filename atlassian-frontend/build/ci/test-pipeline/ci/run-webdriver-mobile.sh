#!/bin/bash

# Shell script for running webdriver tests in CI that extracts repeated commands,
# keeps bitbucket-pipelines.yml concise and prevents the need for extra npm scripts

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="${DIR}/../../../.."

CHANGED="${CHANGED:-}"

function run() {
  # git lfs pull only works from the root in CI
  cd "$ROOT_DIR" && git lfs pull
  cd "$DIR" && LOCAL_IDENTIFIER=$(date +%s) yarn test:webdriver:browserstack_mobile "${POSITIONAL_ARGS[@]}"
  exit
}

(cd "${DIR}/../../../test-utils/webdriver-runner" && BS_PRODUCT=app-automate BS_SESSIONS_ALLOWED=90 yarn get-browserstack-resources)

if [[ -n "$CHANGED" ]]; then
  export CHANGED_PACKAGES
  CHANGED_PACKAGES=$(cd "$ROOT_DIR" && node build/legacy/ci-scripts/get.changed.packages.since.base.branch.js --dependents='direct')
  run "$@" --cached
else
  run "$@"
fi
