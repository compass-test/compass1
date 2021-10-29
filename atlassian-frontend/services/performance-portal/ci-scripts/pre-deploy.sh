#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-env-variables.sh

docker push $IMAGE_TAG
