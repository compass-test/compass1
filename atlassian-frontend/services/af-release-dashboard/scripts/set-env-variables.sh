#!/bin/sh
export IMAGE_NAME=${IMAGE_NAME:-docker.atl-paas.net/atlassian/af-release-dashboard}
export BITBUCKET_BUILD_NUMBER=${BITBUCKET_BUILD_NUMBER:-local}
export IMAGE_VERSION=${IMAGE_VERSION:=$BITBUCKET_BUILD_NUMBER}
export IMAGE_TAG=${IMAGE_NAME}:${IMAGE_VERSION}
export MICROS_ENV=${MICROS_ENV:-ddev}
export STATLAS_NAMESPACE=${STATLAS_NAMESPACE:-atlassian-frontend}
export BITBUCKET_USER=${BITBUCKET_USER:-bitbucketuser}
export BITBUCKET_PASSWORD=${BITBUCKET_PASSWORD:-bitbucketpassword}

# Note: PG_AF_RELEASE_DASHBOARD_HOST is overridden with the special DNS
# host.docker.internal to resolve to the hosts own IP when running 
# yarn dev:docker / dev-docker.sh (See: https://docs.docker.com/docker-for-mac/networking/)
export PG_AF_RELEASE_DASHBOARD_HOST=${PG_AF_RELEASE_DASHBOARD_HOST:-localhost}
export PG_AF_RELEASE_DASHBOARD_PORT=${PG_AF_RELEASE_DASHBOARD_PORT:-5432}
export PG_AF_RELEASE_DASHBOARD_SCHEMA=${PG_AF_RELEASE_DASHBOARD_SCHEMA:-postgres}
export PG_AF_RELEASE_DASHBOARD_ROLE=${PG_AF_RELEASE_DASHBOARD_ROLE:-postgres}
export PG_AF_RELEASE_DASHBOARD_PASSWORD=${PG_AF_RELEASE_DASHBOARD_PASSWORD:-postgres}

echo "----------------------------------"
echo "Environment variables set..."
echo "IMAGE_NAME = $IMAGE_NAME"
echo "IMAGE_VERSION = $IMAGE_VERSION"
echo "IMAGE_TAG = $IMAGE_TAG"
echo "MICROS_ENV = $MICROS_ENV"
echo "STATLAS_NAMESPACE = $STATLAS_NAMESPACE"
echo "PG_AF_RELEASE_DASHBOARD_HOST = $PG_AF_RELEASE_DASHBOARD_HOST"
echo "PG_AF_RELEASE_DASHBOARD_PORT = $PG_AF_RELEASE_DASHBOARD_PORT"
echo "PG_AF_RELEASE_DASHBOARD_SCHEMA = $PG_AF_RELEASE_DASHBOARD_SCHEMA"
echo "BITBUCKET_USER = $BITBUCKET_USER"
echo "BITBUCKET_PASSWORD = ***"
echo "PG_AF_RELEASE_DASHBOARD_ROLE = $PG_AF_RELEASE_DASHBOARD_ROLE"
echo "PG_AF_RELEASE_DASHBOARD_PASSWORD = ***"
echo "----------------------------------"
