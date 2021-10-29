#!/bin/bash

# Turn on exit-on-fail and logging of each command with its variables.
set -ex

# If IS_SOX_COMPLIANT is set, then we need to log into the Pipelines Docker proxy
# as the 'sox' user and build and push the Docker image itself to the registry
# under the /sox namespace. This block sets up the variables here for use with
# those functions further on down in the script.
# See https://hello.atlassian.net/wiki/spaces/RELENG/pages/235155800/HOWTO+Use+Docker+in+Pipelines
if [ "${IS_SOX_COMPLIANT}" = 'true' ]; then
    DOCKER_PROXY_USERNAME="sox"
    SOX_NAMESPACE="sox/"
else
    DOCKER_PROXY_USERNAME="anything"
    SOX_NAMESPACE=""
fi

IMAGE_NAME="twp/node-ref-app"

echo $PIPELINES_JWT_TOKEN | docker login -u=${DOCKER_PROXY_USERNAME} --password-stdin docker-proxy.services.atlassian.com

DOCKER_TAG=$BITBUCKET_BUILD_NUMBER

# Build, push, tag the pipeline CI images:
echo "Pushing the pipeline CI images..."
docker build -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}${IMAGE_NAME}:${DOCKER_TAG} -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}${IMAGE_NAME}:latest .
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}${IMAGE_NAME}:${DOCKER_TAG}
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}${IMAGE_NAME}:latest
