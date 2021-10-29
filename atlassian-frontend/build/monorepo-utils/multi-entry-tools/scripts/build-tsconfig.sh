#!/bin/bash

set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Write entry points to a temporary file first to prevent the original file from being deleted before
# the new entry points have generated.
# This is required to prevent race conditions in our precommit hook where eslint tries to resolve typescript paths
# when tsconfig.entry-points.json is empty since we also regenerate entry points in precommit when a package.json has changed
node "${DIR}/../cli/get-tsconfig-paths.js" > tsconfig.entry-points.tmp.json
mv tsconfig.entry-points.tmp.json tsconfig.entry-points.json
