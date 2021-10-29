#!/bin/bash
source $(dirname "${BASH_SOURCE[0]}")/set-env-variables.sh

docker push $IMAGE_TAG
atlas micros service deploy --service=af-release-dashboard --env=$MICROS_ENV --file=./af-release-dashboard.sd.yml