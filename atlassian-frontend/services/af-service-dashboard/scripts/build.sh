#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-env-variables.sh

export NODE_ENV=production

yarn build:js
yarn build:docker
