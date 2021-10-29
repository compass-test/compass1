#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
RULE=$1
COMMENT=$2

cd "${DIR}/../.."
# We want to continue when lint fails
JSON_REPORTING=true yarn -s lint:eslint --json  --no-color > "${DIR}/lint.json" || true
cd -
yarn suppress-jest-eslint "${DIR}/lint.json" "${RULE}" "${COMMENT}"
