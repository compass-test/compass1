#!/bin/bash

export BITBUCKET_BUILD_NUMBER=${BITBUCKET_BUILD_NUMBER:-local}

export SERVICE_NAME=${SERVICE_NAME:-performance-portal}

export MICROS_ENV=${MICROS_ENV:-ddev}

if [[ $MICROS_ENV == prod-* ]]
then
  export IMAGE_NAME=${IMAGE_NAME:-docker.atl-paas.net/sox/atlassian/performance-portal}
else
  export IMAGE_NAME=${IMAGE_NAME:-docker.atl-paas.net/atlassian/performance-portal}
fi

export IMAGE_VERSION=${IMAGE_VERSION:=$BITBUCKET_BUILD_NUMBER}
export IMAGE_TAG=${IMAGE_NAME}:${IMAGE_VERSION}

if [ -n "$CI" ]; then
  echo "CI env variables"
  echo "----------------------------------"
  echo "SERVICE_NAME = $SERVICE_NAME"
  echo "IMAGE_NAME = $IMAGE_NAME"
  echo "IMAGE_VERSION = $IMAGE_VERSION"
  echo "IMAGE_TAG = $IMAGE_TAG"
  echo "MICROS_ENV = $MICROS_ENV"
  echo "----------------------------------"
fi
