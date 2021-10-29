#!/bin/sh

export SERVICE_NAME="dragonfruit-fe"
export MICROS_ENV=${MICROS_ENV:-ddev}

cd services/dragonfruit

yarn build
yarn pre-deploy # provision
yarn deploy
