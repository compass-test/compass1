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
    DOCKER_PROXY_USERNAME="deployment-bamboo-bot"
    SOX_NAMESPACE=""
fi


echo $PIPELINES_JWT_TOKEN | docker login -u=${DOCKER_PROXY_USERNAME} --password-stdin docker-proxy.services.atlassian.com

DOCKER_TAG=$1
MAJORVERSION=$(echo $1 | sed 's/\([0-9]*\).*/\1/')

# Build, push, tag the pipeline CI images:
echo "Pushing the pipeline CI images..."
docker build -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend:${DOCKER_TAG} -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend:latest -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend:latest-v${MAJORVERSION} .
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend:${DOCKER_TAG}
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend:latest
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend:latest-v${MAJORVERSION}

# Build, push, tag the pipeline CI images for visual-regression:
cd visual-regression-image
echo "Pushing the pipeline CI images for visual-regression..."
docker build -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-vr:${DOCKER_TAG} -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-vr:latest -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-vr:latest-v${MAJORVERSION} .
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-vr:${DOCKER_TAG}
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-vr:latest
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-vr:latest-v${MAJORVERSION}

# Build, push, tag the pipeline CI images for product integrator:
cd - && cd product-integrator-image
echo "Pushing the pipeline CI images for visual-regression..."
docker build -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-product-integrator:${DOCKER_TAG} -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-product-integrator:latest -t docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-product-integrator:latest-v${MAJORVERSION} .
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-product-integrator:${DOCKER_TAG}
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-product-integrator:latest
docker push docker-proxy.services.atlassian.com/${SOX_NAMESPACE}atlassian/atlassian-frontend-product-integrator:latest-v${MAJORVERSION}
