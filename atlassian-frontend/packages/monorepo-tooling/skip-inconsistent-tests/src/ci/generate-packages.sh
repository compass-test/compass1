#!/bin/bash

# Shell script for generating packages to run tests over
# keeps bitbucket-pipelines.yml concise and prevents the need for extra npm scripts

# https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="${DIR}/../../../../.."

PACKAGES=${@:-}

# Tentatively create artifact file
echo -n "" > packages-list.txt

# Determine packages to run tests for and writes them to disk
# Uses user-defined `PACKAGES` when provided, otherwise filters packages by branch name
if [[ -z "${PACKAGES}" ]]; then
  cd "$ROOT_DIR"
  PKGS=$(yarn ts-node -P packages/monorepo-tooling/skip-inconsistent-tests/tsconfig.json packages/monorepo-tooling/skip-inconsistent-tests/src/utils/release-model.ts)
  # Log branch details with package list
  echo "$PKGS" | sed -n '3 p'
  echo "$PKGS" | sed -n '4 p' | tr ' ' '\n'
  # Output packages to file
  echo -n "$PKGS" | sed -n '4 p' > packages-list.txt
else
  # Log packages list & output to file
  echo "User defined packages provided so won't infer from branch:"
  echo "$PACKAGES" | tr ' ' '\n'
  echo -n "$PACKAGES" > packages-list.txt
fi
