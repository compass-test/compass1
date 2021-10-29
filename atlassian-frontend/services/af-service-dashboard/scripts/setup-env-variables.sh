#!/bin/bash

set -e

export BITBUCKET_BUILD_NUMBER=${BITBUCKET_BUILD_NUMBER:-local}
export PACKAGE_VERSION=${npm_package_version:-0.0.0}

export SERVICE_NAME=${SERVICE_NAME:-af-service-dashboard}
export MICROS_ENV=${MICROS_ENV:-ddev}

if [[ $MICROS_ENV == prod-* ]]
then
  export POCO_ENV=prod
  export DNS_ALIAS=${SERVICE_NAME}.prod.atl-paas.net
  export IMAGE_NAME=docker.atl-paas.net/sox/atlassian/af-service-dashboard
elif [[ $MICROS_ENV == stg-* ]]
then
  export POCO_ENV=staging
  export DNS_ALIAS=${SERVICE_NAME}.staging.atl-paas.net
  export IMAGE_NAME=docker.atl-paas.net/atlassian/af-service-dashboard
else
  export POCO_ENV=dev
  export DNS_ALIAS=${SERVICE_NAME}.dev.atl-paas.net
  export IMAGE_NAME=docker.atl-paas.net/atlassian/af-service-dashboard
fi

export IMAGE_VERSION=${IMAGE_VERSION:-$BITBUCKET_BUILD_NUMBER}
export IMAGE_TAG=${IMAGE_NAME}:${IMAGE_VERSION}

if [ -n "$CI" ]; then
  echo "CI env variables"
  echo "----------------------------------"
  echo "SERVICE_NAME = $SERVICE_NAME"
  echo "DNS_ALIAS = $DNS_ALIAS"
  echo "IMAGE_NAME = $IMAGE_NAME"
  echo "IMAGE_VERSION = $IMAGE_VERSION"
  echo "IMAGE_TAG = $IMAGE_TAG"
  echo "MICROS_ENV = $MICROS_ENV"
  echo "----------------------------------"
fi
