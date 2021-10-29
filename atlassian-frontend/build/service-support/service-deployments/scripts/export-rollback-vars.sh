#!/bin/bash

export MICROS_ENV;
MICROS_ENV=$(node build/service-support/service-deployments/scripts/get-master-env.js)
echo $MICROS_ENV

if [[ $MICROS_ENV == prod-* ]]; then
  export MICROS_URL="wss://micros-proxy.services.atlassian.com"
  export MICROS_TOKEN="sox:$PIPELINES_JWT_TOKEN"
else
  source build/service-support/service-deployments/scripts/export-micros-token.sh
fi
