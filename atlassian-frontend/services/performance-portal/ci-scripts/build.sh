#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-env-variables.sh


concurrently "yarn build:ui" "yarn build:server" && \
yarn build:docker
