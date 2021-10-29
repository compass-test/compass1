#!/bin/sh
export IMAGE_NAME=${IMAGE_NAME:-docker.atl-paas.net/atlassian/editor-web-vitals}
export BITBUCKET_BUILD_NUMBER=${BITBUCKET_BUILD_NUMBER:-local}
export IMAGE_VERSION=${IMAGE_VERSION:=$BITBUCKET_BUILD_NUMBER}
export IMAGE_TAG=${IMAGE_NAME}:${IMAGE_VERSION}
export MICROS_ENV=${MICROS_ENV:-ddev}
export STATLAS_NAMESPACE=${STATLAS_NAMESPACE:-atlassian-frontend}


echo "----------------------------------"
echo "Environment variables set..."
echo "IMAGE_NAME = $IMAGE_NAME"
echo "IMAGE_VERSION = $IMAGE_VERSION"
echo "IMAGE_TAG = $IMAGE_TAG"
echo "MICROS_ENV = $MICROS_ENV"
echo "STATLAS_NAMESPACE = $STATLAS_NAMESPACE"
echo "----------------------------------"
