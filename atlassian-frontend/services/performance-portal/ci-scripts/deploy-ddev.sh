#!/bin/bash

export IMAGE_NAME=docker.atl-paas.net/atlassian/performance-portal
export IMAGE_VERSION=local
export MICROS_ENV=ddev

yarn build && yarn pre-deploy && yarn deploy
