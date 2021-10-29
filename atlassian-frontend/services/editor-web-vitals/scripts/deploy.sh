#!/bin/bash
source $(dirname "${BASH_SOURCE[0]}")/set-env-variables.sh

docker push $IMAGE_TAG
atlas micros service deploy --service=editor-web-vitals --env=$MICROS_ENV --file=./editor-web-vitals.sd.yml
