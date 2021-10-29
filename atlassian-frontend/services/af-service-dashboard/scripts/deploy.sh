#!/bin/bash

source $(dirname "${BASH_SOURCE[0]}")/setup-env-variables.sh

atlas micros service deploy --service=$SERVICE_NAME --env=$MICROS_ENV --file=./af-service-dashboard.sd.yml
