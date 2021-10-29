#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-env-variables.sh

docker push $IMAGE_TAG

# Upload poco policies
atlas poco bundle upload --bundle=policies/service/allow.json --test=policies/test.json --label="$SERVICE_NAME-$BITBUCKET_BUILD_NUMBER"

# Release the labeled bundle to the specified environments
atlas poco bundle tag --service=$SERVICE_NAME --envs=$POCO_ENV --label="$SERVICE_NAME-$BITBUCKET_BUILD_NUMBER"
