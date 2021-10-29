#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-env-variables.sh

docker push $IMAGE_TAG

atlas micros service deploy --service=$SERVICE_NAME --env=$MICROS_ENV --file=./performance-portal.sd.yml
