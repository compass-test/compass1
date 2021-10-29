#!/bin/bash

# Bypasses a full bolt install and does a localised yarn install + links in @atlaskit/build-utils
#
# Pre-requisite: @atlaskit/build-utils should be referenced via * to ensure it always satisfies a dependency range and is never bumped
#
# DISCLAIMER: This is a hack and not a long-term solution

# It will exit with failure when a command in the script fails.
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Install the dependencies of @atlaskit/build-utils
cd "${DIR}/../../build/legacy/build-utils"
echo "Yarn installing in $(pwd)..."
yarn install

# Install the dependencies of @atlaskit/ci-scripts
cd "${DIR}"
echo "Yarn installing in $(pwd)..."
yarn install

# Remove the public version of build-utils and symlink the local version
echo "Linking @atlaskit/build-utils..."
rm -rf node_modules/@atlaskit/build-utils
ln -s ../../../../build/legacy/build-utils node_modules/@atlaskit/build-utils

echo "Done."
