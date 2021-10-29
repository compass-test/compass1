#!/bin/bash
source $(dirname "${BASH_SOURCE[0]}")/set-env-variables.sh

concurrently "yarn build:ui" "yarn build:server" && yarn build:docker
