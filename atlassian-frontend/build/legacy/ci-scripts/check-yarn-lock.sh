#!/bin/bash

# Ensures that yarn.lock is in a state that will result in short-circuited installs.
# Prerequisite: Bolt must have already been run in the same pipeline.
#
# The most common causes for non-short circuiting yarn.lock files are:
#   1. Yarn.lock is out of date. This is typically picked up by our bolt --frozen-lockfile command as part of our regular CI steps,
#      however there is an edge case caused by yarn.lock automerging where stale unnecessary entries still linger in yarn.lock that pass --frozen-lockfile
#      but prevent short circuiting. This can be corrected locally by removing node_modules, re-running `bolt` and committing the updated yarn.lock file
#   2. Entries are missing an integrity hash. All entries in yarn.lock _except_ for entries starting with 'file:' or 'http' must have an integrity hash. Unfortunately,
#      this means we cannot use remote URLs or github repo shorthands. If using those dependencies are unavoidable, we can disable the 'unsafe-disable-integrity-migration' yarn setting
#      as a last resort

# Remove packages linked as part of the preinstall script as linked packages influence the state used in short circuiting
rm -rf /usr/local/share/.config/yarn/link/*
# Search for the short circuit install message
# If short circuit installs are working, this bolt should exit early because of the initial bolt install earlier in the pipeline
# FORCE_COLOR=0 disables chalk's coloured text output so we can easily grep for output strings
FORCE_COLOR=0 bolt | tee bolt_output.txt
grep -q 'success Already up-to-date' bolt_output.txt
upToDate=$?
rm bolt_output.txt
if [[ $upToDate -ne 0 ]]; then
  echo 'Yarn.lock is not in a short circuit installable state and may be out of date.'
  git diff
  echo 'Check build/legacy/ci-scripts/check-yarn-lock.sh for reasons why this may occur'
  exit 1
else
  echo 'Yarn.lock is up to date and short-circuit installs are working'
fi

# Lint duplicate dependencies
# Duplicate babel dependencies can greatly degrade build times in certain cases so we have a check to ensure no @babel scoped packages
# are duplicated. We will aim to extend this to all packages in the future.

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
LOCK_PATH="${SCRIPT_DIR}/../../../yarn.lock"

yarn yarn-deduplicate --scopes @babel --fail "$LOCK_PATH"
dedupeResult=$?
if [[ $dedupeResult -ne 0 ]]; then
  echo 'Duplicate babel dependencies detected. Please deduplicate them by running "yarn yarn-deduplicate --scopes @babel -s fewer"'
  exit 1
fi
